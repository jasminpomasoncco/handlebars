const fs = require("fs");

class Contenedor {
  constructor(nombre) {
    this.nombre = nombre;
  }

  async save(producto) {
    try {
      let content = await this.readFile();
      producto.id = this.buildId(content);

      content.push(producto);

      await this.writeFile(content);

      return producto.id;
    } catch (error) {
      console.error(error);
    }
  }

  async getById(id) {
    try {
      let content = await this.readFile();
      content = content.filter((producto) => producto.id === id);
      return content.length == 0 ? null : content;
    } catch (error) {
      console.error(error);
    }
  }

  getAll() {
    try {
      return this.readFile();
    } catch (error) {
      console.error(error);
    }
  }

  async deleteById(id) {
    try {
      let content = await this.readFile();
      this.writeFile(content.filter((producto) => producto.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAll() {
    try {
      this.writeFile([]);
    } catch (error) {
      console.error(error);
    }
  }

  async readFile() {
    try {
      return JSON.parse(await fs.promises.readFile(this.nombre, "utf-8"));
    } catch (error) {
      console.error(error);
    }
  }

  async writeFile(content) {
    try {
      await fs.promises.writeFile(this.nombre, JSON.stringify(content));
    } catch (error) {
      console.error(error);
    }
  }

  buildId(content) {
    try {
      if (content.length === 0) {
        return 1;
      } else {
        content.sort((a, b) => (a.id > b.id ? 1 : -1));
        return content[content.length - 1].id + 1;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Contenedor;