$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "Server is running at http://localhost:$port/"
Write-Host "Press Ctrl+C to stop the server."

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $request.Url.LocalPath
        if ($localPath -eq "/") {
            $localPath = "/index.html"
        }
        
        # Prevent accessing files outside current directory
        $pwdPath = (Get-Location).Path
        $rawFilePath = [System.IO.Path]::Combine($pwdPath, $localPath.TrimStart("/"))
        $filePath = [System.IO.Path]::GetFullPath($rawFilePath)
        
        if (-not $filePath.StartsWith($pwdPath)) {
            $response.StatusCode = 403
            $response.Close()
            continue
        }

        if (Test-Path -LiteralPath $filePath -PathType Leaf) {
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $content.Length
            
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mimeType = "application/octet-stream"
            
            switch ($ext) {
                ".html" { $mimeType = "text/html" }
                ".css"  { $mimeType = "text/css" }
                ".js"   { $mimeType = "application/javascript" }
                ".png"  { $mimeType = "image/png" }
                ".jpg"  { $mimeType = "image/jpeg" }
                ".jpeg" { $mimeType = "image/jpeg" }
                ".gif"  { $mimeType = "image/gif" }
                ".svg"  { $mimeType = "image/svg+xml" }
                ".json" { $mimeType = "application/json" }
                ".ico"  { $mimeType = "image/x-icon" }
            }
            
            $response.ContentType = $mimeType
            
            try {
                $response.OutputStream.Write($content, 0, $content.Length)
            } catch {
                # Ignore connection closed by client
            }
        } else {
            $response.StatusCode = 404
            $errContent = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $errContent.Length
            try { $response.OutputStream.Write($errContent, 0, $errContent.Length) } catch {}
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
}
