# 📄 Project Charter: SaaS Absence Management (Norway MVP)

**Versão:** 1.0  
**Data:** 16 de Janeiro de 2026  
**Status:** Definição de MVP  
**Stack Tecnológica:** Java 21 (Spring Boot 4) & Next.js 16

---

## 1. Objetivo do Produto

Criar uma solução SaaS robusta e escalável para automatizar a gestão de ausências (férias, baixas médicas e licenças) para empresas na Noruega. O foco é substituir processos manuais por um workflow digital que garanta conformidade com a *Arbeidsmiljøloven* (Lei do Ambiente de Trabalho).

---

## 2. Abstração dos Módulos Core

### 🏗️ Módulo 1: Estrutura Organizacional (Multi-tenant)

Este módulo gere a hierarquia da empresa e garante o isolamento de dados entre clientes.

* **Company Management:** Cadastro de empresas com identificação fiscal única.
* **Department & Team Hierarchy:** Estrutura em árvore para definir unidades de negócio.
* **Employee Records:** Gestão de funcionários vinculados a equipas e gestores.
* **Leadership History:** Rastreabilidade total de quem geriu cada equipa em determinado período (Audit Trail).

### ⚙️ Módulo 2: Configuração de Ausências (Rules Engine)

Define como as ausências são processadas e contabilizadas.

* **Tipos de Ausência:** Configuração de *Ferie* (Férias), *Egenmelding* (Autodeclaração), e *Sykmelding* (Atestados).
* **Accrual & Balances:** Motor de cálculo para saldo anual de férias (geralmente 25 dias na Noruega).
* **Calendário Nacional:** Integração de feriados públicos noruegueses para cálculo de dias úteis.
* **Regras de Limite:** Configuração de dias máximos por tipo de ausência e períodos de aviso prévio.

### 🔄 Módulo 3: Pedidos & Workflow de Aprovação

O motor operacional que conecta o funcionário ao gestor.

* **Requisição de Ausência:** Interface para o funcionário solicitar datas, com validação automática de saldo.
* **Fluxo de Status:** Ciclo de vida: `PENDING` -> `AUTHORIZED` (pelo Team Leader) -> `APPROVED` (pelo Manager).
* **Approval Log:** Registo imutável de todas as decisões tomadas sobre um pedido.

---

## 3. Arquitetura de Engenharia

### Backend (Java 21 / Spring Boot 4)

* **JDK 21:** Utilização de *Virtual Threads* para otimizar o throughput de APIs.
* **Persistence:** PostgreSQL com UUIDs nativos para segurança e facilidade de migração.
* **Security:** Spring Security com filtragem por `company_id` ao nível da base de dados (Multi-tenancy seguro).

### Frontend (Next.js 16)

* **App Router:** Renderização eficiente e SEO-friendly.
* **State Management:** Sincronização de dados em tempo real com o backend através de React Server Components e TanStack Query.
* **UI/UX:** Interface limpa focada em acessibilidade e rapidez na submissão de pedidos.

---

## 4. Requisitos de Compliance (Mercado Noruega)

* **GDPR:** Armazenamento de dados sensíveis em conformidade com as diretivas europeias.
* **Egenmelding Logic:** Validação automática do limite de 3 dias consecutivos de autodeclaração, conforme padrão norueguês.
* **Holiday Pay Basis:** Preparação de dados para o cálculo do *Feriepenger*.

---

## 5. Roadmap de Implementação

1. **Milestone 1:** Setup da Base de Dados e Core API (Empresa/Dept/User).
2. **Milestone 2:** Implementação do motor de cálculo de dias (ignorando feriados e fins de semana).
3. **Milestone 3:** Lógica de Saldos e Transações (Módulo 2).
4. **Milestone 4:** Workflow completo de aprovação e notificações.
5. **Milestone 5:** Dashboard de Calendário para Gestores no Frontend.

---

## Estrutura de Pastas: tidly (Frontend)

```text
src/
├── actions/                         # Server Actions (Bridge para API Java)
│   ├── organization/
│   │   ├── company-actions.ts
│   │   ├── department-actions.ts
│   │   └── employee-actions.ts
│   ├── configuration/
│   │   ├── absence-type-actions.ts
│   │   └── holiday-actions.ts
│   └── workflow/
│       └── request-actions.ts
├── app/
│   └── (dashboard)/                 # Rotas Autenticadas
│       ├── organization/
│       │   ├── companies/
│       │   │   └── page.tsx         # Listagem/Gestão de Empresas
│       │   ├── departments/
│       │   │   └── page.tsx         # Hierarquia e Equipas
│       │   └── employees/
│       │       └── page.tsx         # Records de Funcionários
│       ├── configuration/
│       │   ├── absence-types/
│       │   │   └── page.tsx         # Regras de Ferie/Egenmelding
│       │   └── holidays/
│       │       └── page.tsx         # Calendário Nacional Norueguês
│       └── workflow/
│           ├── requests/
│           │   └── page.tsx         # Painel de Pedidos
│           └── approvals/
│               └── page.tsx         # Fila de Aprovação (TL/Manager)
├── components/
│   └── modules/                     # Componentes de Negócio (Feature Sliced)
│       ├── organization/
│       │   ├── company/
│       │   │   ├── company-form.tsx
│       │   │   └── company-list.tsx
│       │   └── employee/
│       │       ├── employee-card.tsx
│       │       └── history-log.tsx
│       ├── configuration/
│       │   └── rules/
│       │       └── accrual-engine-config.tsx
│       └── workflow/
│           └── request/
│               ├── request-modal.tsx
│               └── status-badge.tsx
└── types/
    └── modules/                     # Interfaces (Mirror dos DTOs Java)
        ├── organization/
        │   ├── company.ts
        │   └── employee.ts
        ├── configuration/
        │   └── absence.ts
        └── workflow/
            └── request.ts
```
