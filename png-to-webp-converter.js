// Script para convertir el logo a WebP
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, 'assets', 'img', 'logocouso.png');
const logoWebPPath = path.join(__dirname, 'assets', 'img', 'logocouso.webp');

// Función para convertir a WebP
async function convertToWebP() {
    try {
        await sharp(logoPath)
            .webp({ quality: 90 })
            .toFile(logoWebPPath);
        
        console.log('✅ Logo convertido a WebP con éxito');
    } catch (error) {
        console.error('❌ Error al convertir el logo:', error.message);
    }
}

// Ejecutar la conversión
convertToWebP();
