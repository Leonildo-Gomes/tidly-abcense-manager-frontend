---
name: tidly-frontend-scaffold
description: Gera a stack completa de Frontend (Page, Server Action, Types, Components, Zod Schemas) para Next.js 16, mapeada para a arquitetura modular do Tidly.
---

# Tidly Frontend Scaffolding Protocol

[CONTEXTO]
Projeto: Tidly (SaaS Absence Manager - Norway)
Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS, Shadcn/UI.
Forms & Validation: Zod, React Hook Form, @hookform/resolvers.
Backend: Java 21 Modular Monolith (`no.tidly`).

Sempre que for solicitado criar uma interface para uma funcionalidade, deves mapear os ficheiros respeitando a separação de módulos e usando os templates abaixo.

## 1. Tech Stack & Dependências Obrigatórias

Antes de começar, garante que estas dependências estão instaladas:

```bash
npm install zod react-hook-form @hookform/resolvers clsx tailwind-merge
```

## 2. Roteamento de Módulos (Frontend Router)

Mapeia as entidades para as rotas da aplicação (dentro de `app/(dashboard)`):

| Módulo Backend | Rota Base Frontend (`src/app/(dashboard)/...`) |
| :--- | :--- |
| **organization** | `/organization` (ex: `/organization/employees`) |
| **configuration** | `/configuration` (ex: `/configuration/holidays`) |
| **workflow** | `/workflow` (ex: `/workflow/approvals`) |

## 3. Estrutura de Arquivos (Feature Slice)

Para uma funcionalidade chamada `NomeEntidade` (ex: `Company`) no módulo `organization`, a estrutura DEVE ser:

1. **Types:** `src/types/modules/organization/company.ts` (Interfaces TS puras = DTOs Java)
2. **Schema:** `src/schemas/organization/company-schema.ts` (Validação Zod)
3. **Server Actions:** `src/actions/organization/company-actions.ts` (Bridge para API Java)
4. **Form Component:** `src/components/modules/organization/company/company-form.tsx` (Client Component)
5. **List/View Component:** `src/components/modules/organization/company/company-list.tsx` (Server Component)
6. **Page:** `src/app/(dashboard)/organization/companies/page.tsx` (Server Component - Entry Point)

```text
src/
├── actions/                         # Server Actions (Bridge para API Java)
│   ├── organization/
│   │   ├── company-actions.ts
│   │   └── ...
├── app/
│   └── (dashboard)/                 # Rotas Autenticadas
│       ├── organization/
│       │   ├── companies/
│       │   │   └── page.tsx         # Listagem/Gestão de Empresas
├── components/
│   └── modules/                     # Componentes de Negócio (Feature Sliced)
│       ├── organization/
│       │   ├── company/
│       │   │   ├── company-form.tsx
│       │   │   └── company-list.tsx
├── lib/
│   └── api-client.ts                # Cliente HTTP Centralizado
├── schemas/                         # Zod Schemas
│   └── organization/
│       └── company-schema.ts
└── types/
    └── modules/                     # Interfaces (Mirror dos DTOs Java)
        ├── organization/
        │   └── company.ts
```

## 4. Padrões de Código (Strict Guidelines)

### A. TypeScript Interfaces (`src/types/...`)

- Espelhar EXATAMENTE os `records` Java (DTOs).

```typescript
// src/types/modules/organization/company.ts
export interface CompanyResponse {
  id: string; // UUID
  name: string;
  orgNumber: string;
}

export type CreateCompanyRequest = {
  name: string;
  orgNumber: string;
};
```

### B. Zod Schemas (`src/schemas/...`)

- Centralizar validações aqui para reuso em Actions e Forms.

```typescript
// src/schemas/organization/company-schema.ts
import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  orgNumber: z.string().length(9, "Org Number deve ter 9 dígitos"),
});

export type CompanyFormData = z.infer<typeof companySchema>;
```

### C. Server Actions (`src/actions/...`)

- USAR `src/lib/api-client` (importar como `api`).
- Tratamento de erro robusto (`try/catch`).
- Retornar `ActionState`.
- Usar `revalidatePath` após mutações.

```typescript
// src/actions/organization/company-actions.ts
"use server";

import { api } from "@/lib/api-client";
import { revalidatePath } from "next/cache";
import { CreateCompanyRequest } from "@/types/modules/organization/company";
import { companySchema } from "@/schemas/organization/company-schema";

export type ActionState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function createCompanyAction(data: CreateCompanyRequest): Promise<ActionState> {
  // 1. Validar no Server
  const validated = companySchema.safeParse(data);
  if (!validated.success) {
    return {
      success: false,
      message: "Erro de validação",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    // 2. Chamar Backend Java
    await api.post("/companies", data);

    // 3. Revalidar Cache
    revalidatePath("/organization/companies");
    
    return { success: true, message: "Empresa criada com sucesso!" };
  } catch (error) {
    console.error("Erro ao criar empresa:", error);
    return { success: false, message: "Erro ao comunicar com o servidor." };
  }
}
```

### D. Client Forms (`src/components/modules/...`)

- Usar `useForm` com `zodResolver`.
- Usar `useTransition` para loading state das Server Actions.

```tsx
// src/components/modules/organization/company/company-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { companySchema, CompanyFormData } from "@/schemas/organization/company-schema";
import { createCompanyAction } from "@/actions/organization/company-actions";
// ... imports UI components

export function CompanyForm() {
  const [isPending, startTransition] = useTransition();
  
  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: { name: "", orgNumber: "" },
  });

  function onSubmit(data: CompanyFormData) {
    startTransition(async () => {
      const result = await createCompanyAction(data);
      if (result.success) {
        // toast.success(result.message);
        form.reset();
      } else {
        // toast.error(result.message);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Fields here */}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Salvando..." : "Criar Empresa"}
        </Button>
      </form>
    </Form>
  );
}
```
