### Installation

#### 1. Frontend Setup

1. **Download the frontend code from GitHub:**

   Clone the repository:
   ```bash
   git clone https://github.com/saidasarath/ruleengine-frontend.git
   ```

2. **Install dependencies:**
   Navigate to the frontend directory and run:
   ```bash
   npm install
   ```

3. **Run the frontend code:**
   Once the dependencies are installed, start the frontend:
   ```bash
   npm start
   ```
   The frontend will be running at `http://localhost:3000`.

#### 2. Backend Setup

1. **Download the backend code from GitHub:**

   Clone the repository:
   ```bash
   git clone https://github.com/saidasarath/ruleengine-backend.git
   ```

2. **Database Setup (MySQL):**

   The project uses MySQL as the database. Ensure you have MySQL installed and running locally or on a server. use mysql workbench 8.0 CE

3. **Update database credentials:**

   Open the `application.properties` file located in the `src/main/resources` directory of the backend project, and update the `spring.datasource.username` and `spring.datasource.password` fields with your MySQL username and password:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/rule_engine_db
   spring.datasource.username=your_mysql_username
   spring.datasource.password=your_mysql_password
   ```

4. **Run the backend:**

   Once the changes are made, navigate to the backend directory and start the backend server:
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend will be running at `http://localhost:8080`.
