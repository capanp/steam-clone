# "app" klasörü içindeki tüm "video.webm" dosyalarını bul
$videos = Get-ChildItem -Path "C:\Users\scray\OneDrive\Belgeler\GitHub\steam-klon\public\app" -Recurse -Filter "video.webm"

# Eğer hiç dosya bulunamazsa uyarı ver ve çık
if ($videos.Count -eq 0) {
    Write-Host "No video.webm files found in the app folder."
    exit
}

foreach ($video in $videos) {
    Write-Host "Processing: $($video.FullName)"

    # Geçici dosya adı oluştur
    $tempFile = $video.DirectoryName + "\video_tmp.webm"

    # ffmpeg ile videoyu encode et
    ffmpeg -i "`"$($video.FullName)`"" -c:v libvpx -b:v 1M -c:a libvorbis "`"$tempFile`"" 

    # Eğer encode başarılıysa orijinal dosyanın üzerine yaz
    if (Test-Path $tempFile) {
        Move-Item -Path $tempFile -Destination $video.FullName -Force
        Write-Host "Encoded successfully: $($video.FullName)"
    } else {
        Write-Host "Error encoding: $($video.FullName)"
    }
}

Write-Host "All videos have been encoded!"
