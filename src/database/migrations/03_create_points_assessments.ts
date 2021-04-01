import * as Knex from 'knex';

export async function up(knex: Knex){
  return knex.schema.createTable('point_assessments', table => {
    table.integer('point_id')
    .notNullable()
    .references('id')
    .inTable('points')
    table.integer('assessment_id')
    .notNullable()
    .references('id')
    .inTable('assessment')
    table.boolean('has')
    .notNullable()
  })
}

export async function down(knex: Knex){
  return knex.schema.dropTable('point_assessments')
}