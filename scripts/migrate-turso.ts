import { createClient } from '@libsql/client';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL as string,
});

async function migrateTurso() {
  const migrationsDir = path.join(process.cwd(), 'prisma', 'migrations');
  const items = fs.readdirSync(migrationsDir);
  const migrationFolders = items.filter((item) => fs.statSync(path.join(migrationsDir, item)).isDirectory());

  for (const folder of migrationFolders) {
    const sqlPath = path.join(migrationsDir, folder, 'migration.sql');
    if (fs.existsSync(sqlPath)) {
      console.log(`Executando migração: ${folder}...`);
      const sql = fs.readFileSync(sqlPath, 'utf-8');
      
      // O Turso via libsql suporta múltiplas statements via executeMultiple (executeMultiple foi adicionado recentemente, vamos tentar o execute primeiro ou split)
      const statements = sql.split(';').filter(s => s.trim() !== '');
      
      for (const statement of statements) {
        if (statement.trim()) {
           try {
              await libsql.execute(statement);
           } catch(e: any) {
              // Ignorar erros caso a tabela já exista para ser idempotente nesse caso simples
              console.log("Aviso: ", e.message);
           }
        }
      }
      console.log(`Migração ${folder} concluída.`);
    }
  }
}

migrateTurso().then(() => console.log("Finalizado.")).catch(console.error);
