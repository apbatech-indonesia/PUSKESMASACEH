import { Injectable } from "@angular/core";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

/**
 * EchoService
 * - Membungkus Pusher + Laravel Echo agar mudah digunakan di komponen lain
 * - Panggil `init()` sekali (contoh di AppComponent/ngOnInit), lalu gunakan helper methods
 */
@Injectable({ providedIn: "root" })
export class EchoService {
  private echo: any = null;
  private initialized = false;

  /**
   * Initialize Echo/Pusher.
   * - `opts` wajib berisi `key` (Pusher key). Opsi lain: `cluster`, `authEndpoint`, `auth`, `forceTLS`.
   * - Tidak mengambil nilai dari `environment`.
   */
  init(opts?: any): any {
    if (this.initialized && this.echo) return this.echo;

    const key = opts && opts.key;
    const cluster = opts && opts.cluster;
    const forceTLS =
      opts && typeof opts.forceTLS !== "undefined" ? opts.forceTLS : true;

    if (!key) {
      throw new Error(
        "EchoService.init requires opts.key (Pusher key) and will not read environment variables.",
      );
    }

    const cfg: any = Object.assign(
      {
        broadcaster: "pusher",
        key,
        cluster,
        forceTLS,
      },
      opts || {},
    );

    // Ensure Pusher is available globally for Echo
    (window as any).Pusher = Pusher;

    // Create Echo instance
    this.echo = new (Echo as any)(cfg);
    this.initialized = true;
    return this.echo;
  }

  getEcho(): any {
    return this.echo;
  }

  channel(name: string): any {
    return this.echo ? this.echo.channel(name) : null;
  }

  privateChannel(name: string): any {
    return this.echo ? this.echo.private(name) : null;
  }

  presenceChannel(name: string): any {
    return this.echo ? this.echo.join(name) : null;
  }

  // -- Convenience helpers -------------------------------------------------
  private defaultInitOpts: any = null;

  /**
   * Set default init options so callers can call `subscribe` without init.
   */
  setDefaultOptions(opts: any): void {
    this.defaultInitOpts = opts;
  }

  /**
   * Ensure echo instance is initialized. If not, try to init with provided opts or stored defaults.
   */
  private ensureInitialized(opts?: any): any {
    if (this.initialized && this.echo) return this.echo;
    const initOpts = opts || this.defaultInitOpts;
    if (!initOpts) {
      throw new Error(
        "EchoService: no init options provided. Call init() or setDefaultOptions() first.",
      );
    }
    return this.init(initOpts);
  }

  /**
   * Subscribe to a channel/event with a single call. If Echo isn't initialized,
   * this will initialize it with `initOpts` or previously set defaults.
   * Returns an unsubscribe function.
   */
  subscribe(
    channelName: string,
    event: string,
    callback: (...args: any[]) => void,
    initOpts?: any,
  ): () => void {
    this.ensureInitialized(initOpts);
    const ch = this.channel(channelName);
    if (!ch)
      throw new Error(
        "EchoService: failed to subscribe, channel not available",
      );
    const listener = ch.listen(event, callback);
    // return simple unsubscribe function
    return () => {
      try {
        this.stopListening(channelName, event);
      } catch (e) {
        // ignore
      }
    };
  }

  /**
   * Listen event pada channel. `channel` bisa string (nama) atau objek channel.
   */
  listen(
    channel: string | any,
    event: string,
    callback: (...args: any[]) => void,
  ): any {
    if (!this.echo) return null;
    const ch = typeof channel === "string" ? this.channel(channel) : channel;
    if (!ch) return null;
    return ch.listen(event, callback);
  }

  stopListening(channel: string | any, event?: string): void {
    if (!this.echo) return;
    const chName =
      typeof channel === "string"
        ? channel
        : channel && channel.name
          ? channel.name
          : null;
    if (chName) {
      if (event) {
        this.echo.stopListening(chName, event);
      } else {
        this.echo.leave(chName);
      }
    }
  }

  leave(channelName: string): void {
    if (!this.echo) return;
    this.echo.leave(channelName);
  }

  disconnect(): void {
    if (!this.echo) return;
    try {
      // disconnect underlying pusher if available
      if (this.echo.connector && this.echo.connector.pusher) {
        this.echo.connector.pusher.disconnect();
      }
    } catch (e) {
      // ignore
    }
    this.echo = null;
    this.initialized = false;
  }
}
