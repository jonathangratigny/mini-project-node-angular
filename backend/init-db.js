const { sequelize, Task } = require('./models');

async function init() {
  await sequelize.sync({ force: true });
  await Task.bulkCreate([
    { title: 'Tâche 1', description: 'Exemple de tâche', done: false },
    { title: 'Tâche 2', description: 'Autre tâche', done: true }
  ]);
  console.log('Database initialized with sample data.');
  process.exit(0);
}

init().catch(err => {
  console.error(err);
  process.exit(1);
});
