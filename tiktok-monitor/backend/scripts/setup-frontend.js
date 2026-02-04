import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendDir = path.resolve(__dirname, '..');
const frontendSrcDir = path.resolve(backendDir, '../frontend');
const frontendDestDir = path.resolve(backendDir, './frontend');

console.log('🔧 Setup Frontend...');
console.log('  Fonte:', frontendSrcDir);
console.log('  Destino:', frontendDestDir);

// Se já existe e é igual, não precisa copiar
if (fs.existsSync(frontendDestDir) && fs.existsSync(path.join(frontendDestDir, 'dist'))) {
  console.log('✅ Frontend já existe');
  process.exit(0);
}

// Copiar frontend se não existir
if (fs.existsSync(frontendSrcDir) && !fs.existsSync(frontendDestDir)) {
  try {
    // Criar diretório de destino
    fs.mkdirSync(frontendDestDir, { recursive: true });
    
    // Copiar package.json e src
    const filesToCopy = ['package.json', 'package-lock.json', 'vite.config.js', '.env'];
    filesToCopy.forEach(file => {
      const src = path.join(frontendSrcDir, file);
      if (fs.existsSync(src)) {
        const dest = path.join(frontendDestDir, file);
        fs.copyFileSync(src, dest);
        console.log(`  ✓ Copiado: ${file}`);
      }
    });

    // Copiar diretórios
    const dirsToCopy = ['src', 'public', 'index.html'];
    dirsToCopy.forEach(dir => {
      const src = path.join(frontendSrcDir, dir);
      if (fs.existsSync(src)) {
        const dest = path.join(frontendDestDir, dir);
        if (fs.existsSync(dest)) {
          fs.rmSync(dest, { recursive: true });
        }
        copyDir(src, dest);
        console.log(`  ✓ Copiado: ${dir}/`);
      }
    });

    console.log('✅ Frontend setup completo');
  } catch (error) {
    console.error('❌ Erro ao fazer setup do frontend:', error.message);
  }
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const files = fs.readdirSync(src);
  files.forEach(file => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    const stat = fs.statSync(srcFile);
    
    if (stat.isDirectory()) {
      copyDir(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}
