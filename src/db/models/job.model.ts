import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
  paranoid: true,
  deletedAt:'deletionDate'
})
export default class Job extends Model<Job> {

  @Column
  public title:string;

}
