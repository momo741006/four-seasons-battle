# GitHub Copilot Instructions for Four Seasons Battle (四時軍團)

## Project Overview

This is a **Four Seasons Battle** (四時軍團) web application that combines traditional Chinese BaZi (八字) fortune telling with modern gamification and AI-powered storytelling. The app transforms traditional fortune-telling pillars into themed military legions with characters and narratives.

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4 with custom theme
- **UI Components**: Radix UI primitives with shadcn/ui
- **AI Integration**: GitHub Spark LLM (gpt-4o-mini) for story generation
- **Data Visualization**: Recharts for charts and graphs
- **Icons**: Phosphor Icons React

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

## Code Review Guidelines

### TypeScript & Type Safety
- ✅ All components should use proper TypeScript types
- ✅ Interfaces should be defined for props and data structures
- ✅ Avoid using `any` type - use proper types or generics
- ✅ Check for null/undefined handling with proper guards

### React Best Practices
- ✅ Use functional components with hooks
- ✅ Implement proper error boundaries
- ✅ Use `useCallback` and `useMemo` for optimization when needed
- ✅ Handle loading and error states appropriately
- ✅ Use Spark KV hooks (`useKV`) for persistent storage

### UI/UX Considerations
- ✅ Follow the neon/cyberpunk design theme with dark backgrounds
- ✅ Ensure responsive design (mobile/tablet/desktop)
- ✅ Use Tailwind classes consistently with the theme
- ✅ Implement proper accessibility (ARIA labels, keyboard navigation)
- ✅ Show appropriate loading states and progress indicators

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

## Questions to Ask During Review

1. Does this change respect the traditional BaZi calculation rules?
2. Are AI-generated stories culturally appropriate and engaging?
3. Is the error handling comprehensive for all async operations?
4. Does the UI maintain the cyberpunk/neon theme consistently?
5. Are Chinese terms used correctly and consistently?
6. Is the code accessible to users with disabilities?
7. Does the change work well on mobile devices?
8. Are there any performance implications for the calculations or rendering?
