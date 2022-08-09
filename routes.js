const routes = require('@yolkai/next-routes').default;

const Routes = routes()
  .add({ name: 'deputies', pattern: '/deputados', page: '/deputies/deputies'})
  .add({ name: 'deputyDetails', pattern: '/deputados/:id', page: '/deputies/deputyDetails'})
const { Link } = Routes;

module.exports = { routes: Routes, Link };
