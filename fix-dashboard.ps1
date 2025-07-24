# Fix dashboard syntax errors
$files = @(
    "src\app\DemoPages\Dashboards\analytics\analytics.component.ts",
    "src\app\DemoPages\Dashboards\helpdesk\helpdesk.component.ts", 
    "src\app\DemoPages\Dashboards\managementlab\managementlab.component.ts",
    "src\app\DemoPages\Dashboards\product\product.component.ts",
    "src\app\DemoPages\Dashboards\project-management\project-management.component.ts"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Fixing $file..."
        
        # Fix datalabels syntax
        (Get-Content $file) -replace "display: false}];", "display: false`n      }`n    ];" | Set-Content $file
        
        # Fix yAxes closing bracket  
        (Get-Content $file) -replace "        }],", "        }`n      }]," | Set-Content $file
        
        # Fix xAxes closing bracket
        (Get-Content $file) -replace "        }]", "        }`n      }]" | Set-Content $file
        
        Write-Host "Fixed $file"
    }
}

Write-Host "All dashboard files fixed!"
