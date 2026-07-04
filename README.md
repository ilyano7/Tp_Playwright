# SauceDemo E2E — Playwright + Cucumber + TypeScript

Architecture POM (Page Object Model) pour le test E2E du parcours de checkout sur [SauceDemo](https://www.saucedemo.com).

---

## 📁 Structure du projet

```
saucedemo-e2e/
├── config/
│   └── env.config.ts            # Variables d'environnement centralisées
├── features/
│   ├── checkout.feature          # Scénarios happy-path
│   └── checkout-validation.feature # Critères d'acceptance / validation
├── src/
│   ├── hooks/
│   │   └── hooks.ts             # Before / After / AfterStep Cucumber
│   ├── pages/                   # Page Objects (POM)
│   │   ├── BasePage.ts          # Classe de base avec méthodes communes
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   ├── CartPage.ts
│   │   ├── CheckoutInfoPage.ts
│   │   ├── CheckoutOverviewPage.ts
│   │   ├── CheckoutCompletePage.ts
│   │   └── index.ts             # Barrel export
│   ├── steps/                   # Step Definitions Cucumber
│   │   ├── login.steps.ts
│   │   ├── inventory.steps.ts
│   │   ├── cart.steps.ts
│   │   └── checkout.steps.ts
│   ├── types/
│   │   └── index.ts             # Interfaces TypeScript partagées
│   └── utils/
│       └── world.ts             # CustomWorld (contexte partagé entre steps)
├── cucumber.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Installation

```bash
npm install
npx playwright install chromium
```

---

## ▶️ Exécution des tests

```bash
# Tous les tests
npm test

# Mode visible (pas headless)
HEADLESS=false npm test

# Filtrer par tag
npx cucumber-js --tags "@smoke"
npx cucumber-js --tags "@happy-path"
npx cucumber-js --tags "@validation"
npx cucumber-js --tags "@acceptance-criteria"
```

---

## 🏷️ Tags disponibles

| Tag                    | Description                                |
|------------------------|--------------------------------------------|
| `@e2e`                 | Tous les tests end-to-end                  |
| `@checkout`            | Tests du parcours checkout                 |
| `@happy-path`          | Scénarios nominaux                         |
| `@smoke`               | Test rapide de fumée                       |
| `@validation`          | Validation des champs obligatoires         |
| `@acceptance-criteria` | Critères d'acceptation métier              |
| `@required-fields`     | Tests sur les champs requis               |

---

## ⚙️ Variables d'environnement

| Variable    | Défaut                  | Description                    |
|-------------|-------------------------|--------------------------------|
| `BASE_URL`  | `https://www.saucedemo.com` | URL de l'application       |
| `HEADLESS`  | `true`                  | Mode headless Playwright       |
| `SLOW_MO`   | `0`                     | Ralentissement (ms)            |
| `TIMEOUT`   | `30000`                 | Timeout global (ms)            |
| `USERNAME`  | `standard_user`         | Identifiant de connexion       |
| `PASSWORD`  | `secret_sauce`          | Mot de passe                   |
| `FIRST_NAME`| `John`                  | Prénom pour le checkout        |
| `LAST_NAME` | `Doe`                   | Nom pour le checkout           |
| `ZIP_CODE`  | `75001`                 | Code postal pour le checkout   |

---

## 🧱 Architecture POM

### BasePage
Classe abstraite commune avec :
- `navigate()`, `waitForPageLoad()`
- `clickElement()`, `fillInput()`
- `assertVisible()`, `assertText()`

### CustomWorld
Contexte partagé entre les steps Cucumber :
- Instance de chaque Page Object
- `addedProducts[]` : produits ajoutés au panier pour les assertions

### Hooks
- **Before** : lance le navigateur et instancie les pages
- **AfterStep** : capture d'écran en cas d'échec
- **After** : ferme le navigateur, attache l'URL échouée

---

## 📐 Calcul du prix (Acceptance Criteria)

```
item total = Σ (prix * quantité)
tax        = item total × 8%
total      = item total + tax
```

Vérifié dans `CheckoutOverviewPage.assertPricingCalculation()`.
