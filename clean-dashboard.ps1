# Clean up dashboard syntax errors properly
$files = @(
    "src\app\DemoPages\Dashboards\analytics\analytics.component.ts",
    "src\app\DemoPages\Dashboards\helpdesk\helpdesk.component.ts", 
    "src\app\DemoPages\Dashboards\managementlab\managementlab.component.ts",
    "src\app\DemoPages\Dashboards\product\product.component.ts",
    "src\app\DemoPages\Dashboards\project-management\project-management.component.ts"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Cleaning $file..."
        
        # Read content
        $content = Get-Content $file -Raw
        
        # Fix excessive commas and formatting issues from previous script
        $content = $content -replace "display: false,`r?`n      },`r?`n    },`r?`n  ];", "display: false`r`n      }`r`n    }`r`n  ];"
        $content = $content -replace "        },`r?`n      }],", "        }`r`n      }],"
        $content = $content -replace "        },`r?`n      }]`r?`n    },", "        }`r`n      }]`r`n    },"
        
        # Write back to file
        Set-Content $file $content -NoNewline
        
        Write-Host "Cleaned $file"
    }
}

Write-Host "All dashboard files cleaned!"
