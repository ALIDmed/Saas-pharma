import Drug from "../models/Drug.js";

/* READ */
export const getDrugs = async (req, res) => {
  try {
    const defaultMaxResults = 20;
    const currentPage = req.query.currentPage
      ? parseInt(req.query.currentPage)
      : 1;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : defaultMaxResults;
    const startIndex = (currentPage - 1) * limit;

    const {
      drug_name,
      labo_name,
      category,
      subcategory,
      min_month,
      max_month,
      min_year,
      max_year,
    } = req.body;

    const filter = {};
    if (drug_name)
      filter.drug_name = { $regex: new RegExp("^" + drug_name, "i") };

    if (labo_name && labo_name.length > 0)
      filter.labo_name = { $in: labo_name };

    if (category && category.length > 0) filter.category = { $in: category };

    if (subcategory && subcategory.length > 0)
      filter.subcategory = { $in: subcategory };

    const monthlySearchFilter = {
      //TODO: change data type to data in the collection so the filtering can be easy
      $filter: {
        input: "$monthly_search_volume",
        as: "msv",
        cond: {
          $and: [
            { $gte: ["$$msv.year", min_year || 0] },
            { $lte: ["$$msv.year", max_year || 3000] },
            {
              $or: [
                { $gt: ["$$msv.year", min_year || 0] },
                { $gte: ["$$msv.month_num", min_month || 0] },
              ],
            },
            {
              $or: [
                { $lt: ["$$msv.year", max_year || 3000] },
                { $lte: ["$$msv.month_num", max_month || 13] },
              ],
            },
          ],
        },
      },
    };

    const query = [
      {
        $match: filter,
      },
      {
        $project: {
          drug_name: 1,
          labo_name: 1,
          substance: 1,
          category: 1,
          subcategory: 1,
          trend: 1,
          monthly_search_volume: monthlySearchFilter,
        },
      },
      {
        $sort: { drug_name: 1 },
      },
      {
        $skip: startIndex,
      },
      {
        $limit: limit,
      },
    ];

    const drugs = await Drug.aggregate(query);
    const totalDrugs = await Drug.countDocuments(filter);
    const totalPages = Math.ceil(totalDrugs / limit);

    res.status(200).json({
      drugs,
      currentPage: currentPage,
      totalPages,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getLabos = async (req, res) => {
  const maxResults = 100;
  try {
    const laboQuery = req.query.laboQuery || "";

    const labos = await Drug.aggregate([
      {
        $match: laboQuery
          ? {
              labo_name: {
                $ne: null,
                $regex: new RegExp("^" + laboQuery, "i"),
                $options: "i",
              },
            }
          : {},
      },
      {
        // only keep the labo_name field (optimized for performance)
        $project: {
          labo_name: 1,
        },
      },
      {
        $group: {
          _id: "$labo_name",
        },
      },
      {
        $limit: maxResults,
      },
      {
        $replaceRoot: {
          newRoot: { labo_name: "$_id" }, // Replace the root to directly get labo_name
        },
      },
    ]);

    res.status(200).json({ labos });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getCategories = async (req, res) => {
  const maxResults = 100;
  try {
    const categoryQuery = req.query.categoryQuery || "";

    const categories = await Drug.aggregate([
      {
        $match: categoryQuery
          ? {
              category: {
                $ne: null,
                $regex: new RegExp("^" + categoryQuery, "i"),
                $options: "i",
              },
            }
          : {},
      },
      {
        // only keep the labo_name field (optimized for performance)
        $project: {
          category: 1,
        },
      },
      {
        $group: {
          _id: "$category",
        },
      },
      {
        $limit: maxResults,
      },
      {
        $replaceRoot: {
          newRoot: { category: "$_id" }, // Replace the root to directly get labo_name
        },
      },
    ]);

    res.status(200).json({ categories });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getSubCategories = async (req, res) => {
  const maxResults = 100;
  try {
    const subCategoryQuery = req.query.subCategoryQuery || "";

    const subCategories = await Drug.aggregate([
      {
        $match: subCategoryQuery
          ? {
              subcategory: {
                $ne: null,
                $regex: new RegExp("^" + subCategoryQuery, "i"),
                $options: "i",
              },
            }
          : {},
      },
      {
        // only keep the labo_name field (optimized for performance)
        $project: {
          subcategory: 1,
        },
      },
      {
        $group: {
          _id: "$subcategory",
        },
      },
      {
        $limit: maxResults,
      },
      {
        $replaceRoot: {
          newRoot: { subCategory: "$_id" }, // Replace the root to directly get labo_name
        },
      },
    ]);

    res.status(200).json({ subCategories });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getDrugsVolume = async (req, res) => {
  /* This endpoint get a search query and return drugs along with their latest search volume */
  const maxResults = 100;
  try {
    const drugQuery = req.query.drugQuery || "";

    const drugs = await Drug.aggregate([
      {
        $match: drugQuery
          ? {
              drug_name: {
                $ne: null,
                $regex: new RegExp("^" + drugQuery, "i"),
              },
            }
          : { drug_name: { $ne: null } },
      },
      {
        $sort: { drug_name: 1 },
      },
      {
        $limit: maxResults,
      },
      {
        $project: {
          _id: 0,
          drug_name: "$drug_name",
        },
      },
    ]);

    res.status(200).json({ drugs });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAnalysisDrugs = async (req, res) => {
  try{
    const limit = 10;
    const selectedDrugs = req.body.selectedDrugs
    if (!selectedDrugs || selectedDrugs.length === 0) {
      res.status(404).json({ message: "No drugs options provided" });
    } else {
      const drugs = await Drug.find({
        drug_name: { $in: selectedDrugs },
      }).limit(limit);

      res.status(200).json({ drugs });
    }

  }catch(err){
    res.status(404).json({ message: err.message });
  }
}
