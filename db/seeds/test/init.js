'use strict';

exports.seed = function(knex, Promise) {
    return Promise.all([
        knex('users').del()
        .then(function() {
            return knex('users').insert([
                { id: 2, email: 'dc@test.ode', password: 'password' },
                { id: 3, email: 'ek@test.ode', password: 'password' },
                { id: 4, email: 'ja@test.ode', password: 'password' },
                { id: 5, email: 'pnhd@test.ode', password: 'password' },
                { id: 6, email: 'ad@test.ode', password: 'password' }
            ]);
        }),
        knex('teams').del()
        .then(function() {
            return knex('teams').insert([
                { id: 1, name: 'ode', desc: 'all of ode' },
                { id: 2, name: 'tech', desc: 'all of ode tech people' },
                { id: 3, name: 'research', desc: 'all of ode research people' }
            ]);
        }),
        knex('team_users').del()
        .then(function() {
            return knex('team_users').insert([
                { id: 1, team_id: '1', user_id: '2' },
                { id: 2, team_id: '1', user_id: '3' },
                { id: 3, team_id: '1', user_id: '4' },
                { id: 4, team_id: '1', user_id: '5' },
                { id: 5, team_id: '1', user_id: '6' },
                { id: 6, team_id: '2', user_id: '3' },
                { id: 7, team_id: '2', user_id: '4' },
                { id: 8, team_id: '2', user_id: '6' },
                { id: 9, team_id: '3', user_id: '2' },
                { id: 10, team_id: '3', user_id: '5' }
            ]);
        })
    ]);
};
