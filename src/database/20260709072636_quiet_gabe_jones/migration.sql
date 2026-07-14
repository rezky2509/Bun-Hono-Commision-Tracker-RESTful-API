CREATE TABLE `agents` (
	`id` text PRIMARY KEY UNIQUE,
	`agent_code` text(10) NOT NULL UNIQUE,
	`full_name` text(255),
	`team_type` text(20)
);
--> statement-breakpoint
CREATE TABLE `payouts_discrepancies` (
	`id` text PRIMARY KEY,
	`transaction_id` text,
	`calculated_commission` real,
	`actual_amount_paid` real,
	`variance_delta` real,
	`created_at` integer,
	CONSTRAINT `fk_payouts_discrepancies_transaction_id_sales_transactions_id_fk` FOREIGN KEY (`transaction_id`) REFERENCES `sales_transactions`(`id`)
);
--> statement-breakpoint
CREATE TABLE `sales_transactions` (
	`id` text PRIMARY KEY,
	`agent_id` text NOT NULL,
	`student_id` text NOT NULL,
	`target_account` text,
	`gross_amount` real,
	`transaction_date` integer,
	`created_at` integer,
	CONSTRAINT `fk_sales_transactions_agent_id_agents_id_fk` FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`),
	CONSTRAINT `fk_sales_transactions_student_id_students_id_fk` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`)
);
--> statement-breakpoint
CREATE TABLE `students` (
	`id` text PRIMARY KEY,
	`full_name` text(255)
);
