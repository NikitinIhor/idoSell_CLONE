export const ctrlWrapper = ctr => {
  const func = async (req, res, next) => {
    try {
      await ctr(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};
