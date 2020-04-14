module.exports = {
  getSiteInfoBySite: async ctx => {
    const { site } = ctx.params;
    try {
      const info = await knex
        .first(infoColumn)
        .where({ site: site })
        .from("info");
      return (ctx.body = {
        status: "success",
        data: {
          info: info || {}
        }
      });
    } catch (e) {
      return (ctx.body = {
        status: "fail",
        data: e.stack
      });
    }
  },

  addInfo: async (ctx, next) => {
    try {
      await knex("info")
        .returning("id")
        .insert(ctx.request.body);
      return (ctx.body = {
        status: "success",
        data: null
      });
    } catch (e) {
      return (ctx.body = {
        status: "fail",
        data: e.stack
      });
    }
  },

  editInfoBySite: async (ctx, next) => {
    const { site } = ctx.params;
    try {
      await knex("info")
        .update(ctx.request.body)
        .where({ site });
      return (ctx.body = {
        status: "success",
        data: null
      });
    } catch (e) {
      return (ctx.body = {
        status: "fail",
        data: e.stack
      });
    }
  }
};
