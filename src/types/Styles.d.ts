type TextType = 'text-preset-1' | 'text-preset-2' | 'text-preset-3';

type FontsStyles = Record<Font, Record<TextType, string>>;

type FontsStylesSettings = {[key in Font]: string};

type ColorsStyles = Record<Color, {text: string; background: string; stroke: string}>;
