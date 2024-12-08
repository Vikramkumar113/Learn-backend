import Articles from "../Models/Articles.js";

export const getAllArticles = async (req, res) => {

  const searchItem = req.query.search;
  const filters = {};

  // add filter of title and tags
  // tags is array of strings ex: ["Node", "Environment"]

  if(searchItem){
     const regex = new RegExp(searchItem, 'i');
     filters.$or = [
      { title: { $regex: regex } },
      { tags: { $elemMatch: { $regex: regex } } }
    ];
  }

  try {
    const allArticles = await Articles.find(filters);
    res.status(200).json(allArticles);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "We can't find what are you looking for" });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const oneArticle = await Articles.findById(req.params.id);
    res.status(200).json(oneArticle);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "We can't find what are you looking for" });
  }
};

export const createArcticle = async (req, res) => {
  const { title, content, tags } = req.body;

  try {
    if (title === "" || content === "") {
      res.status(400).json({ error: "Title and content can not be empty" });
    }

    const newArticle = new Articles({
      title: title,
      content: content,
      tags: tags,
    });

    await newArticle.save();
    res.status(200).json(newArticle);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "We can't find what are you looking for" });
  }
};

export const updateArticle = async (req, res) => {
  const id = req.params.id;

  try {
    if (!id) {
      res.status(400).json({ error: "Id is required" });
    }

    const updateArticle = await Articles.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        ...req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateArticle);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "We can't find what are you looking for" });
  }
};

export const deleteArticle = async (req, res) => {
   const id = req.params.id;

   try {
      if(!id){
        res.status(400).json({error:"Id is required"})
      }

      const article = await Articles.findByIdAndDelete(id)
      res.status(200).json({
        msg:"Article deleted"
      })
   }catch(e){
    console.log(e);
    res.status(500).json({ error: "We can't find what are you looking for" });
   }
}
