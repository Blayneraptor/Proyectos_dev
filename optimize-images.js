const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Directorio de imágenes
const imgDir = path.join(__dirname, 'assets', 'img');
const projectsDir = path.join(imgDir, 'projects');
const logoDir = path.join(imgDir, 'logo');
const iconsDir = path.join(imgDir, 'icons');

// Función para procesar una imagen
async function processImage(inputPath, quality = 80) {
    const ext = path.extname(inputPath).toLowerCase();
    
    // Solo procesar archivos de imagen comunes
    if (!['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
        return;
    }
    
    const outputPath = inputPath.replace(ext, '.webp');
    
    // Si ya existe versión WebP, omitir
    if (fs.existsSync(outputPath)) {
        return;
    }
    
    console.log(`Procesando: ${inputPath}`);
    
    try {
        // Convertir a WebP y optimizar
        await sharp(inputPath)
            .webp({ quality })
            .toFile(outputPath);
        
        // Obtener tamaños antes y después
        const originalSize = fs.statSync(inputPath).size;
        const newSize = fs.statSync(outputPath).size;
        const savings = ((originalSize - newSize) / originalSize * 100).toFixed(2);
        
        console.log(`✅ Generado ${outputPath} (Ahorro: ${savings}%)`);
    } catch (error) {
        console.error(`❌ Error al procesar ${inputPath}:`, error.message);
    }
}

// Procesar recursivamente un directorio
async function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            await processDirectory(filePath);
        } else {
            await processImage(filePath);
        }
    }
}

// Procesar todas las imágenes
(async () => {
    console.log('Iniciando optimización de imágenes...');
    
    await processDirectory(imgDir);
    
    console.log('Proceso de optimización completado.');
})();
