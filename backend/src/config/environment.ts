import zennv from 'zennv';
import z from 'zod';

const envSchema = z.object({
	NODE_ENV: z.string(),
	HOST: z.string(),
	PORT: z.number(),
	ORIGIN: z.string(),
	REDIS_URL: z.string(),
	CSRF_SECRET: z.string(),
	RATE_LIMIT_WINDOW_MS: z.number(),
	RATE_LIMIT_MAX: z.number(),
	JWT_SECRET: z.string(),
	JWT_REFRESH_SECRET: z.string(),
	SESSION_SECRET: z.string(),
	ROOT_USER_EMAIL: z.string(),
	ROOT_USER_PASSWORD: z.string(),
});

class Environment {
	private environment: z.infer<typeof envSchema>;

	constructor() {
		this.environment = zennv({
			dotenv: true,
			schema: envSchema,
		});
	}

	public get<T extends keyof z.infer<typeof envSchema>>(key: T): z.infer<typeof envSchema>[T] {
        return this.environment[key];
    }
}

const environment = new Environment();
export default environment;