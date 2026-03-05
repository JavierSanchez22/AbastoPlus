import { injectable } from "inversify";
import { TranslatorService } from "../application/ports/translator-servicie";

@injectable()
export class ApiTranslatorService implements TranslatorService {
    
    public async translateToEnglish(text: string): Promise<string> {
        try {
            const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=es|ar`;
            
            const response = await fetch(url);
            const data = await response.json();

            if (data && data.responseData && data.responseData.translatedText) {
                return data.responseData.translatedText;
            }
            return text;  // Si no se pudo traducir, devolvemos el texto original

        } catch (error) {
            console.error(`Error al intentar traducir "${text}":`, error);
            return text;  // Guardamos el original por si hay error al traducir
        }
    }
}