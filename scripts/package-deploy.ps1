$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
$previousDeployTarget = $env:DEPLOY_TARGET

Push-Location -LiteralPath $projectRoot
try {
    # Nginx deployment uses root-relative URLs rather than GitHub Pages paths.
    $env:DEPLOY_TARGET = $null
    & npm.cmd run build
    if ($LASTEXITCODE -ne 0) {
        throw "Static build failed. Deployment package was not created."
    }

    $dateStamp = Get-Date -Format "yyyyMMdd"
    $releaseIndex = 1
    do {
        $releaseName = "portfolio-deploy-$dateStamp-$releaseIndex"
        $releaseDirectory = Join-Path $projectRoot $releaseName
        $archivePath = Join-Path $projectRoot "$releaseName.tar.gz"
        $checksumPath = "$archivePath.sha256"
        $releaseIndex++
    } while ((Test-Path -LiteralPath $releaseDirectory) -or
             (Test-Path -LiteralPath $archivePath) -or
             (Test-Path -LiteralPath $checksumPath))

    if (-not (Test-Path -LiteralPath "out/index.html" -PathType Leaf)) {
        throw "Static output index.html was not found."
    }

    New-Item -ItemType Directory -Path $releaseDirectory | Out-Null
    Copy-Item -LiteralPath "out" -Destination (Join-Path $releaseDirectory "web") -Recurse
    Copy-Item -LiteralPath "deploy/portfolio/compose.yaml", "deploy/portfolio/nginx.conf" -Destination $releaseDirectory
    $deploymentGuide = Get-Content -LiteralPath "deploy/portfolio/README.md" -Raw -Encoding UTF8
    $deploymentGuide = $deploymentGuide -replace 'portfolio-deploy-\d{8}-\d+', $releaseName
    $utf8Encoding = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText((Join-Path $releaseDirectory "README.md"), $deploymentGuide, $utf8Encoding)

    & tar.exe -czf $archivePath -C $projectRoot $releaseName
    if ($LASTEXITCODE -ne 0) {
        throw "Deployment archive creation failed."
    }

    $hashAlgorithm = [System.Security.Cryptography.SHA256]::Create()
    $archiveStream = [System.IO.File]::OpenRead($archivePath)
    try {
        $archiveHash = [System.BitConverter]::ToString($hashAlgorithm.ComputeHash($archiveStream)).Replace("-", "").ToLowerInvariant()
    }
    finally {
        $archiveStream.Dispose()
        $hashAlgorithm.Dispose()
    }
    [System.IO.File]::WriteAllText($checksumPath, "$archiveHash  $releaseName.tar.gz`n", $utf8Encoding)
    Write-Output "Created: $releaseName.tar.gz"
    Write-Output "Checksum: $releaseName.tar.gz.sha256"
}
finally {
    $env:DEPLOY_TARGET = $previousDeployTarget
    Pop-Location
}
