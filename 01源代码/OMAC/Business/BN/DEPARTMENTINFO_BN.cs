﻿using System;
using System.Text;
using System.Data.OracleClient;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Entity.System;

namespace Business.BN
{
    public class DEPARTMENTINFO_BN
    {

        public bool Exists(string F_DEPARTMENTCODE)
        {
            StringBuilder strSql = new StringBuilder();
            DbAPI dbHelper = new DbAPI();
            strSql.Append("select count(1) from DEPARTMENTINFO");
            strSql.Append(" where ");
            strSql.Append(" F_DEPARTMENTCODE = :F_DEPARTMENTCODE  ");
            OracleParameter[] parameters = {
					new OracleParameter(":F_DEPARTMENTCODE", OracleType.VarChar,36)			};
            parameters[0].Value = F_DEPARTMENTCODE;

            if (dbHelper.ExecuteNonQuery(strSql.ToString(), parameters) > 0)
            {
                return true;
            }
            else
            {
                return false;
            }

        }



        /// <summary>
        /// 增加一条数据
        /// </summary>
        public void Add(Entity.DEPARTMENTINFO model)
        {
            StringBuilder strSql = new StringBuilder();
            DbAPI dbHelper = new DbAPI();
            strSql.Append("insert into DEPARTMENTINFO(");
            strSql.Append("F_DEPARTMENTCODE,F_NAME,F_DESCRIPTION,F_PARENT");
            strSql.Append(") values (");
            strSql.Append(":F_DEPARTMENTCODE,:F_NAME,:F_DESCRIPTION,:F_PARENT");
            strSql.Append(") ");

            OracleParameter[] parameters = {
			            new OracleParameter(":F_DEPARTMENTCODE", OracleType.VarChar,36) ,            
                        new OracleParameter(":F_NAME", OracleType.NVarChar) ,            
                        new OracleParameter(":F_DESCRIPTION", OracleType.NVarChar) ,            
                        new OracleParameter(":F_PARENT", OracleType.VarChar,36)             
              
            };

            parameters[0].Value = model.F_DEPARTMENTCODE;
            parameters[1].Value = model.F_NAME;
            parameters[2].Value = model.F_DESCRIPTION;
            parameters[3].Value = model.F_PARENT;
            dbHelper.ExecuteNonQuery(strSql.ToString(), parameters);

        }


        /// <summary>
        /// 更新一条数据
        /// </summary>
        public bool Update(Entity.DEPARTMENTINFO model)
        {
            StringBuilder strSql = new StringBuilder();
            DbAPI dbHelper = new DbAPI();
            strSql.Append("update DEPARTMENTINFO set ");

            strSql.Append(" F_DEPARTMENTCODE = :F_DEPARTMENTCODE , ");
            strSql.Append(" F_NAME = :F_NAME , ");
            strSql.Append(" F_DESCRIPTION = :F_DESCRIPTION , ");
            strSql.Append(" F_PARENT = :F_PARENT  ");
            strSql.Append(" where F_DEPARTMENTCODE=:F_DEPARTMENTCODE  ");

            OracleParameter[] parameters = {
			            new OracleParameter(":F_DEPARTMENTCODE", OracleType.VarChar,36) ,            
                        new OracleParameter(":F_NAME", OracleType.NVarChar) ,            
                        new OracleParameter(":F_DESCRIPTION", OracleType.NVarChar) ,            
                        new OracleParameter(":F_PARENT", OracleType.VarChar,36)             
              
            };

            parameters[0].Value = model.F_DEPARTMENTCODE;
            parameters[1].Value = model.F_NAME;
            parameters[2].Value = model.F_DESCRIPTION;
            parameters[3].Value = model.F_PARENT;
            int rows = dbHelper.ExecuteNonQuery(strSql.ToString(), parameters);
            if (rows > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }


        /// <summary>
        /// 删除一条数据
        /// </summary>
        public bool Delete(string F_DEPARTMENTCODE)
        {

            StringBuilder strSql = new StringBuilder();
            DbAPI dbHelper = new DbAPI();
            strSql.Append("delete from DEPARTMENTINFO ");
            strSql.Append(" where F_DEPARTMENTCODE=:F_DEPARTMENTCODE ");
            OracleParameter[] parameters = {
					new OracleParameter(":F_DEPARTMENTCODE", OracleType.VarChar,36)			};
            parameters[0].Value = F_DEPARTMENTCODE;


            int rows = dbHelper.ExecuteNonQuery(strSql.ToString(), parameters);
            if (rows > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }



        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public Entity.DEPARTMENTINFO GetModel(string F_DEPARTMENTCODE)
        {

            StringBuilder strSql = new StringBuilder();
            DbAPI dbHelper = new DbAPI();
            strSql.Append("select F_DEPARTMENTCODE, F_NAME, F_DESCRIPTION, F_PARENT  ");
            strSql.Append("  from DEPARTMENTINFO ");
            strSql.Append(" where F_DEPARTMENTCODE=:F_DEPARTMENTCODE ");
            OracleParameter[] parameters = {
					new OracleParameter(":F_DEPARTMENTCODE", OracleType.VarChar,36)			};
            parameters[0].Value = F_DEPARTMENTCODE;


            Entity.DEPARTMENTINFO model = new Entity.DEPARTMENTINFO();
            DataTable ds = dbHelper.GetDataTable(strSql.ToString(), parameters);

            if (ds.Rows.Count > 0)
            {
                model.F_DEPARTMENTCODE = ds.Rows[0]["F_DEPARTMENTCODE"].ToString();
                model.F_NAME = ds.Rows[0]["F_NAME"].ToString();
                model.F_DESCRIPTION = ds.Rows[0]["F_DESCRIPTION"].ToString();
                model.F_PARENT = ds.Rows[0]["F_PARENT"].ToString();

                return model;
            }
            else
            {
                return null;
            }
        }


        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataTable GetList(string strWhere)
        {
            StringBuilder strSql = new StringBuilder();
            DbAPI dbHelper = new DbAPI();
            OracleParameter[] parameters = null;
            strSql.Append("select t.*,0 AS \"ISUSERIN\" ");
            strSql.Append(" FROM DEPARTMENTINFO t");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            strSql.Append(" ORDER BY t.f_departmentcode ASC");

            dbHelper.OpenConn("");
            var rst = dbHelper.GetDataTable(strSql.ToString(), parameters);
            dbHelper.CloseConn();
            return rst;
        }

        /// <summary>
        /// 获得前几行数据
        /// </summary>
        public DataTable GetList(int Top, string strWhere, string filedOrder)
        {
            StringBuilder strSql = new StringBuilder();
            DbAPI dbHelper = new DbAPI();
            OracleParameter[] parameters = null;
            strSql.Append("select ");
            if (Top > 0)
            {
                strSql.Append(" top " + Top.ToString());
            }
            strSql.Append(" * ");
            strSql.Append(" FROM DEPARTMENTINFO ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            strSql.Append(" order by " + filedOrder);
            return dbHelper.GetDataTable(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 获取所有的数据
        /// </summary>
        /// <returns></returns>
        public DataTable GetAll()
        {
            StringBuilder strSql = new StringBuilder();
            DbAPI dbHelper = new DbAPI();
            strSql.Append("select * ");
            strSql.Append(" FROM DEPARTMENTINFO");
            dbHelper.OpenConn("");

            try
            {
                DataTable bt = dbHelper.GetDataTable(strSql.ToString(), null);
                dbHelper.CloseConn();
                return bt;
            }
            catch (Exception ex)
            {
                LogBN.WriteLog(typeof(DEPARTMENTINFO_BN), "GetAll 程序段的异常" + ex);
                return null;
            }
        }

        #region 部门树

        /// <summary>
        /// 获取部门树
        /// </summary>
        /// <returns></returns>
        public List<TreeEntity> GetDepartmentTree()
        {
            var dt = GetList("");
            try
            {
                var list = new List<TreeEntity>
                {
                    new TreeEntity
                    {
                        id = 0.ToString(),
                        text = "北海分局",
                        nodes = GetTreeChildren(0.ToString(),dt)
                    }
                };
                return list;

            }
            catch (Exception ex)
            {
                LogBN.WriteLog(typeof(DEPARTMENTINFO_BN), "GetTree 程序段的异常" + ex);
                return null;
            }

        }


        /// <summary>
        /// 递归获取树节点
        /// </summary>
        /// <param name="groupId">父节点</param>
        /// <param name="dt">源表</param>
        /// <returns></returns>
        private static List<TreeEntity> GetTreeChildren(string groupId, DataTable dt)
        {
            IEnumerable<DataRow> dt1 = dt.AsEnumerable();
            dt1 = dt1.Where(p => p["F_PARENT"].ToString() == groupId);

            return !dt1.Any()
                ? null
                : dt1.Select(dataRow => new TreeEntity
                {
                    id = dataRow["F_DEPARTMENTCODE"].ToString(),
                    text = dataRow["F_NAME"].ToString(),
                    nodes = GetTreeChildren(dataRow["F_DEPARTMENTCODE"].ToString(), dt)
                }).ToList();
        }

        #endregion

        /// <summary>
        /// 新增部门
        /// </summary>
        /// <param name="deptName">部门名称</param>
        /// <param name="pid">父节点ID</param>
        public bool AddDepartment(string deptName, string pid)
        {
            StringBuilder strSql = new StringBuilder();
            DbAPI dbHelper = new DbAPI();
            strSql.Append("insert into departmentinfo(f_departmentcode, f_name, f_description, f_parent)values((SELECT TO_CHAR(MAX(TO_NUMBER(f_departmentcode))+1) FROM departmentinfo),:deptName,'',:pid)");
            OracleParameter[] parms =
            {
                new OracleParameter("deptName", deptName),
                new OracleParameter("pid", pid)
            };

            try
            {
                dbHelper.OpenConn("");
                var rstInt = dbHelper.ExecuteNonQuery(strSql.ToString(), parms);
                dbHelper.CloseConn();
                return rstInt > 0;
            }
            catch (Exception ex)
            {
                LogBN.WriteLog(typeof(DEPARTMENTINFO_BN), "新增部门AddDepartment 程序段的异常" + ex);
                return false;
            }

        }

        /// <summary>
        /// 修改部门
        /// </summary>
        /// <param name="deptName">部门名称</param>
        /// <param name="id">部门ID</param>
        /// <returns>是否成功的JSON结果</returns>
        public bool UpdateDepartment(string deptName, string id)
        {
            StringBuilder strSql = new StringBuilder();
            DbAPI dbHelper = new DbAPI();
            strSql.Append("update departmentinfo set f_name=:deptName where f_departmentcode=:id");
            OracleParameter[] parms =
            {
                new OracleParameter("deptName", deptName),
                new OracleParameter("id", id)
            };

            try
            {
                dbHelper.OpenConn("");
                var rstInt = dbHelper.ExecuteNonQuery(strSql.ToString(), parms);
                dbHelper.CloseConn();
                return rstInt > 0;
            }
            catch (Exception ex)
            {
                LogBN.WriteLog(typeof(DEPARTMENTINFO_BN), "修改部门AddDepartment 程序段的异常" + ex);
                return false;
            }

        }

        /// <summary>
        /// 删除部门
        /// </summary>
        /// <param name="id">部门ID</param>
        /// <returns>是否成功的JSON结果</returns>
        public bool DeleteDepartment(string id)
        {
            StringBuilder strSql = new StringBuilder();
            DbAPI dbHelper = new DbAPI();
            strSql.Append("delete from departmentinfo where f_departmentcode=:id");
            OracleParameter[] parms =
            {
               new OracleParameter("id", id)
            };

            try
            {
                dbHelper.OpenConn("");
                var rstInt = dbHelper.ExecuteNonQuery(strSql.ToString(), parms);
                dbHelper.CloseConn();
                return rstInt > 0;
            }
            catch (Exception ex)
            {
                LogBN.WriteLog(typeof(DEPARTMENTINFO_BN), "删除部门AddDepartment 程序段的异常" + ex);
                return false;
            }

        }


        /// <summary>
        /// 获得数据列表(with user)
        /// </summary>
        public DataTable GetAllDeptsByUser(string userAccount)
        {
            var strSql = new StringBuilder();
            var dbHelper = new DbAPI();

            OracleParameter[] parms =
            {
                new OracleParameter("F_ACCOUNT", userAccount)
            };

            strSql.Append("SELECT A.*, DECODE(B.F_ID, NULL, 0, 1) AS \"ISUSERIN\"");
            strSql.Append(" FROM DEPARTMENTINFO A");
            strSql.Append(" LEFT JOIN (SELECT * FROM DEPARTMENTUSER WHERE F_ACCOUNT = :F_ACCOUNT) B");
            strSql.Append(" ON A.F_DEPARTMENTCODE = B.F_DEPARTMENTCODE");
            strSql.Append(" ORDER BY A.f_departmentcode ASC");

            dbHelper.OpenConn("");
            var rst = dbHelper.GetDataTable(strSql.ToString(), parms);
            dbHelper.CloseConn();
            return rst;
        }

        /// <summary>
        /// 递归获取树节点(with user)
        /// </summary>
        /// <param name="userAccount">用户名</param>
        public List<TreeEntity> GetDepartmentTreeByUser(string userAccount)
        {
            var dt = string.IsNullOrWhiteSpace(userAccount) ? GetList("") : GetAllDeptsByUser(userAccount);
            try
            {
                var nodes = GetTreeChildrenByUser(0.ToString(), dt);
                return nodes;
            }
            catch (Exception ex)
            {
                LogBN.WriteLog(typeof(DEPARTMENTINFO_BN), "递归获取树节点GetDepartmentTreeByUser 程序段的异常" + ex);
                return null;
            }

        }

        /// <summary>
        /// 递归获取树节点(with user)
        /// </summary>
        /// <param name="groupId">父节点</param>
        /// <param name="dt">源表</param>
        private static List<TreeEntity> GetTreeChildrenByUser(string groupId, DataTable dt)
        {
            IEnumerable<DataRow> dt1 = dt.AsEnumerable();
            dt1 = dt1.Where(p => p["F_PARENT"].ToString() == groupId);
            
            return !dt1.Any()
                ? null
                : dt1.Select(dataRow => new TreeEntity
                {
                    id = dataRow["F_DEPARTMENTCODE"].ToString(),
                    text = dataRow["F_NAME"].ToString(),
                    state = new NodeState { selected = dataRow["ISUSERIN"].ToString() == "1" },
                    nodes = GetTreeChildrenByUser(dataRow["F_DEPARTMENTCODE"].ToString(), dt)
                }).ToList();
        }




    }
}

