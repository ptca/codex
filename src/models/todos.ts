import { Entity, PrimaryGeneratedColumn, Column, Generated } from "typeorm";

@Entity()
export class TodoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: true })
  task: string;

  @Column("boolean", { nullable: true })
  done: boolean;
}
