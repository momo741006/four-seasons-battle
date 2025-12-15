# GitHub Copilot Instructions - 四時軍團 (Four Seasons Battle)

## Project Overview

This is a Ba Zi (八字) astrology analysis system that combines traditional Chinese fortune-telling with a gamified military legion theme. The application transforms birth chart pillars into four themed legions (Family, Growth, Self, Future) with AI-generated stories.

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 with custom neon/cyberpunk theme
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: React hooks + @github/spark KV storage
- **Charts**: Recharts for data visualization
- **AI Integration**: GitHub Spark LLM API (gpt-4o-mini)
- **Icons**: @phosphor-icons/react

## Core Functionality

### 1. BaZi Calculation (`src/lib/bazi.ts`)
- Calculates traditional Chinese Eight Characters (八字) based on birth date/time
- Generates four pillars: Year, Month, Day, Hour (年柱、月柱、日柱、時柱)
- Determines Heavenly Stems (天干) and Earthly Branches (地支)
- Calculates Five Elements (五行: 木火土金水) distribution
- Determines Yin-Yang (陰陽) balance

### 2. Legion Creation (`src/lib/legion.ts`)
- Transforms BaZi pillars into themed military legions
- Assigns characters based on elements and attributes:
  - **General** (主將): Based on Heavenly Stem
  - **Strategist** (軍師): Based on hidden stems
  - **Lieutenant** (副將): Additional strategic role
- Four themed legions:
  - Family Legion (家族兵團 - Year Pillar)
  - Growth Legion (成長兵團 - Month Pillar)
  - Self Legion (本我兵團 - Day Pillar)
  - Future Legion (未來兵團 - Hour Pillar)

### 3. AI Story Generation (`src/components/AIStoryGenerator.tsx`)
- Uses GitHub Spark LLM to generate personalized stories
- Creates narratives for each legion based on their characteristics
- Implements typewriter effect for story display
- Supports story sharing via Web Share API or clipboard

### 4. Data Visualization (`src/components/BaZiCharts.tsx`)
- Displays Five Elements balance as pie/radar charts
- Shows Yin-Yang distribution
- Interactive charts using Recharts library

## Code Style & Conventions

### TypeScript

- Use strict TypeScript with proper type definitions
- Define interfaces for all data structures (BaZiInput, BaZiChart, Legion, etc.)
- Avoid `any` types - use specific types or generics
- Export types from their respective modules
- Check for null/undefined handling with proper guards

### React Patterns

- Use functional components with hooks
- Prefer named exports for components
- Use `useKV` hook from @github/spark for persistent state
- Follow the existing pattern: `const [state, setState] = useKV<Type>("key", defaultValue)`
- Handle async operations with try-catch blocks and proper error states
- Implement proper error boundaries
- Use `useCallback` and `useMemo` for optimization when needed
- Handle loading and error states appropriately

### Component Structure

```tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// ... other imports

interface ComponentProps {
  // Define props with proper types
}

export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // State declarations
  const [state, setState] = useState<Type>(initialValue);
  
  // Event handlers
  const handleAction = async () => {
    // Implementation
  };
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Styling Guidelines

- Use Tailwind utility classes
- Follow the neon/cyberpunk theme with these key classes:
  - `neon-text` - for glowing text effects
  - `neon-glow` - for card and button glow effects
  - `bg-space` - for space/cosmic backgrounds
  - `font-orbitron` - for sci-fi headings
- Color scheme:
  - Primary: Neon Blue (#00D4FF)
  - Background: Deep Space Blue (#0A0E27)
  - Accent: Neon Purple (#BB00FF)
  - Legion specific colors (gold-brown, green-yellow, blue-purple, orange-red)
- Ensure responsive design (mobile/tablet/desktop)
- Implement proper accessibility (ARIA labels, keyboard navigation)
- Show appropriate loading states and progress indicators

### File Organization

```
src/
├── components/        # React components
│   ├── ui/           # Base UI components (shadcn-style)
│   ├── BaZiInputForm.tsx
│   ├── LegionCard.tsx
│   ├── TraditionalBaZi.tsx
│   ├── BaZiCharts.tsx
│   └── AIStoryGenerator.tsx
├── lib/              # Utility functions and business logic
│   ├── bazi.ts       # Ba Zi calculation algorithms
│   ├── legion.ts     # Legion creation logic
│   └── utils.ts      # General utilities
├── hooks/            # Custom React hooks
└── App.tsx          # Main application component
```

## Domain-Specific Knowledge

### Ba Zi (八字) System

- **Four Pillars**: Year (年柱), Month (月柱), Day (日柱), Hour (時柱)
- **Each Pillar Contains**:
  - Heavenly Stem (天干): 10 stems (甲乙丙丁戊己庚辛壬癸)
  - Earthly Branch (地支): 12 branches (子丑寅卯辰巳午未申酉戌亥)
  - Hidden Stems (藏干): Secondary stems within branches
  - Nayin (納音): Element sound classification
  - Element (五行): Wood, Fire, Earth, Metal, Water (木火土金水)

### Legion Mapping

- **Family Legion (家族兵團)** - Year Pillar: Heritage and ancestry
- **Growth Legion (成長兵團)** - Month Pillar: Development and career
- **Self Legion (本我兵團)** - Day Pillar: Core personality and self
- **Future Legion (未來兵團)** - Hour Pillar: Goals and destiny

### Legion Character Roles

Each legion has:
- **General (主將)**: Leader with personality traits and strengths
- **Strategist (軍師)**: Wise advisor with tactical abilities
- **Deputy (副將)**: Supporting officer

## AI Story Generation

### Pattern for LLM Prompts

```typescript
const promptText = `你是一位精通中國古代軍事文學的作家。請為以下軍團創作一個引人入勝的故事：

軍團名稱：${legion.name}
主將：${legion.general.name} (${legion.general.title})
軍師：${legion.strategist.name} (${legion.strategist.title})
副將：${legion.deputy.name}

主將特質：${legion.general.personality.join(', ')}
主將優勢：${legion.general.strengths.join(', ')}

請創作一個150-200字的精彩故事，包含：
1. 軍團的起源背景
2. 主要角色的互動關係
3. 面臨的挑戰或任務
4. 體現軍團特色的情節

語調要古典而富有詩意，適合現代讀者。故事要完整且引人入勝。`;

const story = await window.spark.llm(promptText, "gpt-4o-mini");
```

### Fallback Handling

Always provide fallback content when AI generation fails:

```typescript
try {
  const story = await window.spark.llm(promptText, "gpt-4o-mini");
  generatedStories.push(story);
} catch (error) {
  const fallbackStory = `在${legion.theme}的時空中，${legion.general.name}率領著${legion.name}，與智慧軍師${legion.strategist.name}並肩作戰。這支軍團承載著特殊的使命，每一位成員都發揮著獨特的作用，共同書寫著屬於您的命運篇章。`;
  generatedStories.push(fallbackStory);
}
```

## User Experience Patterns

### Loading States

- Show loading indicators during calculations: `isCalculating` state
- Use progress bars for multi-step operations (AI generation)
- Provide feedback with toast notifications (sonner library)

### Success Messages

```typescript
import { toast } from "sonner";

toast.success("四時軍團生成成功！");
toast.error("計算失敗，請重試");
```

### Typewriter Effect

Implement gradual text reveal for storytelling:

```typescript
const startTypewriter = (text: string) => {
  setIsTyping(true);
  setDisplayedText('');
  // Implement character-by-character display
};
```

## Code Review Guidelines

### Cultural & Domain Accuracy
- ✅ Respect Chinese cultural concepts and terminology
- ✅ Ensure BaZi calculations follow traditional rules
- ✅ Maintain consistency in Chinese/English terminology
- ✅ Verify element interactions follow Five Elements theory (五行相生相剋)

### AI Integration
- ✅ Handle AI generation failures gracefully with fallback content
- ✅ Implement proper error handling for `window.spark.llm` calls
- ✅ Use appropriate prompts that generate culturally relevant content
- ✅ Consider token limits and response times

### Performance
- ✅ Optimize re-renders with proper dependency arrays
- ✅ Lazy load components when appropriate
- ✅ Use code splitting for larger features
- ✅ Optimize images and assets

### Testing Focus Areas
- Data calculations (BaZi algorithm accuracy)
- Form validation and input handling
- AI story generation and fallback logic
- Chart rendering and data transformation
- Responsive layout across devices

## Common Patterns to Look For

### Good Practices
```typescript
// ✅ Proper error handling with toast notifications
try {
  const result = await window.spark.llm(prompt, "gpt-4o-mini");
  toast.success("操作成功");
} catch (error) {
  toast.error("操作失敗，請重試");
  console.error('Error:', error);
}

// ✅ Type-safe props
interface LegionCardProps {
  legion: Legion;
  onSelect?: (legion: Legion) => void;
}
```

### Patterns to Flag
```typescript
// ❌ Missing error handling
const result = await window.spark.llm(prompt);

// ❌ Using any type
const data: any = calculateBaZi(input);

// ❌ Missing loading states
<Button onClick={handleGenerate}>生成</Button>

// ❌ Hard-coded values that should be constants
if (element === "wood") { ... } // Should use ELEMENTS constant
```

## Key Files to Review Carefully

1. **`src/lib/bazi.ts`**: Core calculation logic - verify accuracy
2. **`src/lib/legion.ts`**: Character assignment logic - ensure proper mapping
3. **`src/components/AIStoryGenerator.tsx`**: AI integration - check error handling
4. **`src/App.tsx`**: Main app logic - verify state management
5. **`src/components/BaZiInputForm.tsx`**: Input validation - check edge cases

## Terminology Reference

- **八字 (BaZi)**: Eight Characters / Four Pillars of Destiny
- **天干 (Tiangan)**: Heavenly Stems (10 total)
- **地支 (Dizhi)**: Earthly Branches (12 total)
- **五行 (Wuxing)**: Five Elements (Wood, Fire, Earth, Metal, Water)
- **陰陽 (Yinyang)**: Yin and Yang
- **十神 (Shishen)**: Ten Gods (relationships between elements)
- **納音 (Nayin)**: Sixty Jiazi sound classification
- **藏干 (Canggan)**: Hidden Heavenly Stems in Earthly Branches

## Data Persistence

Use Spark KV storage for user data:

```typescript
const [baziChart, setBaziChart] = useKV<BaZiChart | null>("bazi-chart", null);
const [legions, setLegions] = useKV<Legion[]>("user-legions", []);
```

## Important Calculations

### Element Distribution

Track five element counts across all pillars:

```typescript
const elements: Record<string, number> = {
  '木': 0, '火': 0, '土': 0, '金': 0, '水': 0
};
```

### Yin-Yang Balance

Count yin (陰) and yang (陽) stems:

```typescript
const yinYang = { yin: 0, yang: 0 };
```

## Common Pitfall Prevention

1. **Date Calculations**: Account for timezone and solar calendar conversions
2. **Array Indexing**: Use modulo operator for cyclical systems (60 Jia Zi cycle)
3. **Error Boundaries**: Wrap calculations in try-catch blocks
4. **Type Safety**: Ensure all Ba Zi elements are properly typed
5. **AI Timeouts**: Implement proper timeout handling for LLM calls

## Testing Considerations

- Test with various birth dates and times
- Verify correct pillar calculations
- Check legion character generation
- Validate AI story fallback mechanisms
- Ensure responsive design across devices

## Internationalization Notes

- Primary language: Traditional Chinese (繁體中文)
- Key terms should remain in Chinese for authenticity
- UI labels and instructions in Chinese
- Error messages should be user-friendly in Chinese

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## When Adding New Features

1. **Check PRD.md** for design direction and requirements
2. **Follow existing patterns** in similar components
3. **Use TypeScript** for all new code with proper types
4. **Add error handling** for async operations
5. **Maintain theme consistency** with neon/cyberpunk styling
6. **Test calculations** thoroughly with edge cases
7. **Provide fallbacks** for AI and external dependencies
8. **Update types** in respective lib files if adding new data structures

## Questions to Ask During Review

1. Does this change respect the traditional BaZi calculation rules?
2. Are AI-generated stories culturally appropriate and engaging?
3. Is the error handling comprehensive for all async operations?
4. Does the UI maintain the cyberpunk/neon theme consistently?
5. Are Chinese terms used correctly and consistently?
6. Is the code accessible to users with disabilities?
7. Does the change work well on mobile devices?
8. Are there any performance implications for the calculations or rendering?

## Code Generation Tips for Copilot

- When suggesting Ba Zi calculations, reference the existing algorithms in `src/lib/bazi.ts`
- For new components, follow the pattern in `src/components/` with proper imports
- Use existing UI components from `@/components/ui/` rather than creating new ones
- Maintain the cosmic/military theme in all UI suggestions
- Include proper TypeScript types for all functions and components
- Consider mobile responsiveness in all layout suggestions
- Use the project's color scheme and font system consistently
