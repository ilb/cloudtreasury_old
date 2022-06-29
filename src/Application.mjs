import awilix from 'awilix';
const { asValue, asClass } = awilix;
import prisma from 'libs/prisma';
import nodeCache from 'libs/nodeCache';
import container from 'src/container';

export default class Application {
  constructor() {
    this.container = null;
  }
  /**
   * initialize application
   */
  async createContainer() {
    this.container = awilix.createContainer();

    // register currentUser, datasource, prisma
    this.container.register({
      userCode: asValue(process.env.USER),
      currentUser: asValue(process.env.USER),
      prisma: asValue(prisma),
      nodeCache: asValue(nodeCache)
    });
    const classes = {};
    for (var [key, value] of container) {
      classes[key] = asClass(value);
    }
    this.container.register(classes);
  }

  /**
   * create scope for http request
   * @param {*} req
   */
  async createScope(req, withSession = false, addScope = null) {
    if (this.container == null) {
      await this.createContainer();
    }
    // console.log(this.container);

    const scope = this.container.createScope();
    if (addScope) {
      // console.log({ addScope });
      const addScopeValues = {};
      for (var [key, value] of addScope) {
        addScopeValues[key] = asValue(value);
      }
      this.container.register(addScopeValues);
    }
    // const xRemoteUser = req && req.headers && req.headers['x-remote-user'];
    // const currentUser = xRemoteUser || process.env.USER;
    // scope.register({ currentUser: asValue(currentUser) });

    return scope;
  }

  /**
   * resolve bean by name
   * @param {*} name name of bean
   */
  resolve(name) {
    return this.container.resolve(name);
  }

  asArray(resolvers) {
    return {
      resolve: (container, opts) => resolvers.map((r) => container.build(r, opts))
    };
  }
}
