'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Area);//associando a tabela para a chave estrangeira
      this.hasOne(models.Usuario);
    }
  }
  Curso.init({
    sigla: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: {
          args: [4, 4],//validando que so pode colocar 4 caracteres
          msg: "A Sigla precisa conter 4 caracteres"//mensagem se não cumprir o argumento
        }
      }
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: {
          args: [3, 40],
          msg: "O nome do curso precisa conter entre 3 e 40 caracteres"
        }
      }
    },
    descricao: DataTypes.TEXT,
    areaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Curso',
  });
  return Curso;
};