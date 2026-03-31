import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { NotificationPayload } from "./websocket.service";

interface NotifState {
  intervalId?: any;
  lastCount: number;
  subject: Subject<number>;
  checkFn?: () => void;
}

export interface NotificationOptions {
  audio?: string; // follow-up sound (can be customized per notification)
  title?: string; // browser notification title
  body?: string; // browser notification body
  repeat?: boolean; // whether to repeat the follow-up sound (default: true)
}

@Injectable({ providedIn: "root" })
export class NotificationService {
  private states: Map<string, NotifState> = new Map();
  private readonly BASE_API = "https://emr.clenicapp.com/api";

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  // key: notification key (e.g., 'resep','hasil-lab'), kdcabang used in URL
  // Accept either: start(kdcabang,key,pollMs,options) or start(kdcabang,key,options)
  start(
    kdcabang: string,
    key: string,
    pollMsOrOptions: number | NotificationOptions = 10000,
    options?: NotificationOptions,
  ) {
    let pollMs: number;
    if (typeof pollMsOrOptions === "object") {
      options = pollMsOrOptions as NotificationOptions;
      pollMs = 10000;
    } else {
      pollMs = (pollMsOrOptions as number) || 10000;
    }
    const id = this.getId(kdcabang, key);
    if (this.states.has(id)) return this.states.get(id).subject.asObservable();

    const subject = new Subject<number>();
    const state: NotifState = { intervalId: undefined, lastCount: 0, subject };
    // load cached
    try {
      const cached = localStorage.getItem(this.cacheKey(kdcabang, key));
      if (cached !== null) state.lastCount = Number(cached) || 0;
    } catch (e) {
      state.lastCount = 0;
    }

    const check = () => {
      const url = `${this.BASE_API}/${kdcabang}/notifications/${key}`;
      try {
        this.http.get(url).subscribe(
          (resp: any) => {
            if (!resp) return;
            const newCount = Number(resp.data) || 0;
            if (newCount > state.lastCount) {
              try {
                localStorage.setItem(
                  this.cacheKey(kdcabang, key),
                  String(newCount),
                );
              } catch (e) {}
              state.lastCount = newCount;
              // side-effects: toastr + sound + browser notif
              this.toastr.info(options?.body ?? `Ada ${key} baru.`);
              // initial sound is fixed; allow overriding only the follow-up sound.
              const followUp = options?.audio;
              this.playAlarmWithUrls(
                undefined,
                followUp,
                options?.repeat ?? true,
              );
              this.showBrowserNotification(
                options?.title ?? key.toUpperCase(),
                options?.body ?? `Ada ${key} baru.`,
              );
              subject.next(newCount);
            } else {
              try {
                localStorage.setItem(
                  this.cacheKey(kdcabang, key),
                  String(newCount),
                );
              } catch (e) {}
              state.lastCount = newCount;
            }
          },
          (err) => {
            // ignore polling errors
          },
        );
      } catch (e) {
        console.warn("NotificationService check failed", e);
      }
    };

    // immediate + interval
    state.checkFn = check;
    check();
    state.intervalId = setInterval(check, pollMs);
    this.states.set(id, state);
    return subject.asObservable();
  }

  /**
   * Trigger an immediate check for a running notification poll.
   * Returns true if the check was triggered, false otherwise.
   */
  public refresh(kdcabang: string, key: string): boolean {
    const id = this.getId(kdcabang, key);
    const state = this.states.get(id);
    if (state && state.checkFn) {
      try {
        state.checkFn();
        return true;
      } catch (e) {
        console.warn("NotificationService.refresh failed", e);
        return false;
      }
    }
    return false;
  }

  stop(kdcabang: string, key: string) {
    const id = this.getId(kdcabang, key);
    const state = this.states.get(id);
    if (state) {
      try {
        if (state.intervalId) clearInterval(state.intervalId);
      } catch (e) {}
      try {
        state.subject.complete();
      } catch (e) {}
      this.states.delete(id);
    }
  }

  stopAll() {
    for (const [id, state] of this.states) {
      try {
        if (state.intervalId) clearInterval(state.intervalId);
      } catch (e) {}
      try {
        state.subject.complete();
      } catch (e) {}
    }
    this.states.clear();
  }

  private cacheKey(kdcabang: string, key: string) {
    return `notif_${kdcabang}_${key}`;
  }

  private getId(kdcabang: string, key: string) {
    return `${kdcabang}::${key}`;
  }

  private playAlarm() {
    // deprecated: kept for compatibility without params
    this.playAlarmWithUrls(
      "https://knm.clenicapp.com/clenic/sound/notify.wav",
      "https://knm.clenicapp.com/clenic/sound/RESEP.wav",
    );
  }

  private playAlarmWithUrls(
    notifUrl?: string,
    audioUrl?: string,
    repeat: boolean = true,
  ) {
    try {
      const a1 = new Audio(
        notifUrl || "https://knm.clenicapp.com/clenic/sound/notify.wav",
      );
      const a2 = new Audio(
        audioUrl || "https://knm.clenicapp.com/clenic/sound/RESEP.wav",
      );
      a1.onended = () => {
        let plays = 0;
        const targetPlays = repeat ? 2 : 1;
        const delay =
          a2.duration && !isNaN(a2.duration) ? a2.duration * 1000 : 1000;
        const playOnce = () => {
          try {
            a2.currentTime = 0;
            a2.play().catch((e) => console.warn("audio play failed", e));
          } catch (e) {
            console.warn("audio play error", e);
          }
          plays++;
        };
        playOnce();
        if (targetPlays > 1) {
          const iv = setInterval(() => {
            if (plays >= targetPlays) {
              clearInterval(iv);
              return;
            }
            playOnce();
          }, delay);
        }
      };
      a1.play().catch((e) => console.warn("notif play failed", e));
    } catch (e) {
      console.warn("playAlarm failed", e);
    }
  }

  private showBrowserNotification(title: string, body: string) {
    try {
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(title, { body });
      }
    } catch (e) {}
  }

  /**
   * Push a notification payload to the server for a specific branch/key.
   * POST https://websocket.clenicapp.com/api/{kdcabang}/notifications/{key}
   */
  public pushNotification(
    kdcabang: string,
    key: string,
    payload: any,
  ): Observable<any> {
    if (!kdcabang) throw new Error("kdcabang is required");
    if (!key) throw new Error("key is required");
    const url = `${this.BASE_API}/${kdcabang}/notifications/${key}`;
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post(url, payload, { headers });
  }
}
