# Color Palette Documentation

## `colorPalette.ts`

```typescript
// colorPalette.ts
interface ColorPalette {
  primary: string;
  secondary: string;
  positiveGreen: string;
  background: string;
  text: string;
}

export default ColorPalette;
```
The `ColorPalette` interface in `colorPalette.ts` defines the different color variables that can be used throughout the application.

## 
```typescript
const customColorPalette: ColorPalette = {
  primary: '#27374D',
  secondary: '#526D82',
  positiveGreen: '#2ecc71',
  background: '#EFECEC',
};

export const theme = {
  colors: customColorPalette,
};
```

In `theme.ts`, a custom color palette is implemented using the `ColorPalette` interface. This theme object is then exported for easy integration into the components.