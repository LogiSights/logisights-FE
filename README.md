# LogiSight - Modern Logistics Platform

LogiSight is a comprehensive logistics management platform frontend built with Angular 16. It provides a robust, role-based interface for managing the entire logistics lifecycle, from order initiation to final delivery.

## 🚀 Key Features

- **Multi-Role Dashboards**: Tailored interfaces for Admins, Drivers, Senders, and Pickup agents.
- **Real-time Tracking**: Monitor shipments and vehicle locations (integrated with logistics backend).
- **Order Management**: Streamlined process for creating and managing logistics orders.
- **Role-Based Access Control (RBAC)**: Secure routing and feature access managed via Auth Guards.
- **Interactive Analytics**: Data visualization using Chart.js for logistics performance monitoring.
- **Responsive Design**: Optimized for various devices using modern CSS and Angular Material.

## 🛠️ Tech Stack

- **Framework**: [Angular 16.2.16](https://angular.io/)
- **UI Components**: [Angular Material](https://material.angular.io/)
- **Icons**: [Lucide Angular](https://lucide.dev/guide/packages/lucide-angular)
- **Charts**: [Chart.js](https://www.chartjs.org/) with [ng2-charts](https://valor-software.com/ng2-charts/)
- **State Management**: RxJS
- **Styling**: SCSS (Vanilla CSS principles)

## 📁 Project Structure

```text
src/app/
├── core/           # Singleton services, guards, and interceptors
├── shared/         # Reusable components, directives, and pipes
└── modules/        # Feature-based modules
    ├── admin/      # Administrative tools
    ├── auth/       # Authentication (Login/Signup)
    ├── driver/     # Driver-specific features
    ├── landing/    # Public landing page
    ├── pickup/     # Pickup agent features
    └── sender/     # Sender/Customer features
```

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Angular CLI](https://github.com/angular/angular-cli) installed globally (`npm install -g @angular/cli`)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd LogiSight-FE
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Run `npm run start` or `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `npm run build` or `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running Tests

Run `npm run test` or `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

