use sqlx::{Pool, Postgres};
use std::env;

pub async fn init_db() -> Result<Pool<Postgres>, sqlx::Error> {
    // In a real application, you would get this from environment variables
    let database_url = env::var("DATABASE_URL").unwrap_or_else(|_| {
        // Default to a local SQLite database for development
        "postgres://postgres:postgres@localhost/dexly".to_string()
    });
    
    // Create a connection pool
    let pool = sqlx::postgres::PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await?;
    
    // Run migrations (in a real app)
    // sqlx::migrate!("./migrations").run(&pool).await?;
    
    Ok(pool)
} 