const Category = require("../../models/Category");

const index = async (req, res) => {
    try {
        const categories = await Category.find();
        res.render("admin/categories/index", {
            layout: "layouts/admin",

            categories
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }

};
const showCreateForm = (req, res) => {
    try {
        res.render("admin/categories/create", {
            layout: "layouts/admin",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }

}

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        await Category.create({
            name
        });
        res.redirect("/admin/categories");

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");

    }
}

const showEditForm = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if(!category){
            return res.status(404).send("category not found")
        }
        res.render("admin/categories/edit", {
            layout: "layouts/admin",
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");

    }

};

const editCategory = async (req, res) => {
    try {
        const { name } = req.body;
        await Category.findByIdAndUpdate(
            req.params.id,
            { name }
        );
        res.redirect("/admin/categories")
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");

    }

}

const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id)
        res.redirect("/admin/categories")
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }

}
module.exports = {
    index,
    showCreateForm,
    createCategory,
    showEditForm,
    editCategory,
    deleteCategory
}