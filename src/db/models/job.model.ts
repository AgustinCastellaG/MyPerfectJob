import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
  paranoid: true,
  deletedAt:'deletionDate'
})
export class Job extends Model<Job> {

  @Column
  public titulo:string;

  @Column
  public empresa:string;

  @Column
  public localizacion:string;

  @Column
  public jornada:string;

  @Column
  public contrato:string;

  @Column
  public salario:string;

  @Column({
    type: DataType.TEXT
  })
  public descripcion: string;

  @Column({
    type: DataType.TEXT
  })
  public requerimientos: string;

  @Column
  public scrapedFrom : string;

  @Column
  public experiencia : string;

}

export default Job;
