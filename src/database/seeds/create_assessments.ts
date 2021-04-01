import * as Knex from 'knex';

export async function seed(knex: Knex){
  return knex('assessments').insert([{
    assessment: 'Medição de temperatura dos frequentadores.'
  },
  {
    assessment: 'Possui uma cabine que realize descontaminação.'
  },
  {
    assessment: 'Disponibiliza alcool em gel para os frequentadores.'
  },
  {
    assessment: 'Capacidade para atender grandes públicos com segurança.'
  }])
}
