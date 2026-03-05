export interface TranslatorService {
    translateToEnglish(product: string): Promise<string>;
}
