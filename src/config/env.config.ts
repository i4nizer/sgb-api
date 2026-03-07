//

const env = {
	port: Number(process.env.PORT),
	host: process.env.HOST || "",
	protocol: process.env.PROTOCOL || "",
	multer: { path: process.env.MULTER_PATH || "" },
	jwt: { secret: process.env.JWT_SECRET || "" },
	supabase: {
		url: process.env.SUPABASE_URL || "",
		key: process.env.SUPABASE_KEY || "",
	},
	database: {
		user: process.env.DATABASE_USER || "",
		pass: process.env.DATABASE_PASS || "",
		host: process.env.DATABASE_HOST || "",
		port: Number(process.env.DATABASE_PORT),
		name: process.env.DATABASE_NAME || "",
		log: process.env.DATABASE_LOG === "true",
		sync: process.env.DATABASE_SYNC === "true",
		alter: process.env.DATABASE_ALTER === "true",
		force: process.env.DATABASE_FORCE === "true",
		dialect: process.env.DATABASE_DIALECT || "",
	},
}

//

export default env
