import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
	console.error("❌ Error starting the server:", err);
	process.exit(1);
});
