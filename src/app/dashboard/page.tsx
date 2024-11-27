"use client";

import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Cookies from "js-cookie";

// Componentes de shadcn/ui (sin cambios)
const Card = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`rounded-lg border bg-white shadow-md ${className}`}
    {...props}
  />
);

const CardHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
);

const CardTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
    {...props}
  />
);

const CardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 pt-0 ${className}`} {...props} />
);

const Select = ({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    {...props}
  >
    {children}
  </select>
);

const Table = ({
  className,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) => (
  <div className="w-full overflow-auto">
    <table
      className={`w-full caption-bottom text-sm ${className}`}
      {...props}
    />
  </div>
);

const TableHeader = ({
  className,
  ...props
}: React.TableHTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={`bg-gray-50 ${className}`} {...props} />
);

const TableBody = ({
  className,
  ...props
}: React.TableHTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={`divide-y divide-gray-200 ${className}`} {...props} />
);

const TableRow = ({
  className,
  ...props
}: React.TableHTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className={`transition-colors hover:bg-gray-50 ${className}`}
    {...props}
  />
);

const TableHead = ({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={`h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  />
);

const TableCell = ({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td
    className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  />
);

const Button = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4 ${className}`}
    {...props}
  />
);

const Input = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
    {...props}
  />
);

const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        {children}
        <Button
          onClick={onClose}
          className="mt-4 bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          Cerrar
        </Button>
      </div>
    </div>
  );
};

export default function EstadisticasEstudiantiles() {
  const handleFetchStats = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/statistics", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
        },
      });
      const responseData = await response.json();
      // Procesar datos y actualizar estado
      const formattedData = responseData.map((item) => ({
        id: item.id,
        periodo: item.academic_period.period,
        carrera: item.career.name,
        graduados: parseInt(item.graduate_students),
        admitidos: parseInt(item.admited_students),
        matriculados: parseInt(item.enrolled_students),
        retirados: parseInt(item.retired_students),
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  useEffect(() => {
    handleFetchStats();
  }, []);

  const [data, setData] = useState([
    {
      id: 1,
      periodo: "2021-1",
      carrera: "Ingeniería",
      graduados: 50,
      admitidos: 200,
      matriculados: 180,
      retirados: 20,
    },
    {
      id: 2,
      periodo: "2021-1",
      carrera: "Medicina",
      graduados: 30,
      admitidos: 100,
      matriculados: 95,
      retirados: 5,
    },
    {
      id: 3,
      periodo: "2021-2",
      carrera: "Ingeniería",
      graduados: 55,
      admitidos: 210,
      matriculados: 190,
      retirados: 15,
    },
    {
      id: 4,
      periodo: "2021-2",
      carrera: "Medicina",
      graduados: 35,
      admitidos: 110,
      matriculados: 100,
      retirados: 8,
    },
    {
      id: 5,
      periodo: "2022-1",
      carrera: "Ingeniería",
      graduados: 60,
      admitidos: 220,
      matriculados: 200,
      retirados: 18,
    },
    {
      id: 6,
      periodo: "2022-1",
      carrera: "Medicina",
      graduados: 40,
      admitidos: 120,
      matriculados: 110,
      retirados: 7,
    },
    {
      id: 7,
      periodo: "2022-2",
      carrera: "Ingeniería",
      graduados: 65,
      admitidos: 230,
      matriculados: 210,
      retirados: 16,
    },
    {
      id: 8,
      periodo: "2022-2",
      carrera: "Medicina",
      graduados: 45,
      admitidos: 130,
      matriculados: 120,
      retirados: 6,
    },
  ]);

  const [tipoEstadistica, setTipoEstadistica] = useState("graduados");
  const [periodo, setPeriodo] = useState("todos");
  const [carrera, setCarrera] = useState("todas");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newData, setNewData] = useState({
    periodo: "",
    carrera: "",
    graduados: 0,
    admitidos: 0,
    matriculados: 0,
    retirados: 0,
  });

  const datosFiltrados = useMemo(() => {
    return data
      .filter((item) => periodo === "todos" || item.periodo === periodo)
      .filter((item) => carrera === "todas" || item.carrera === carrera);
  }, [data, periodo, carrera]);

  const colores = {
    graduados: "#3B82F6",
    admitidos: "#10B981",
    matriculados: "#F59E0B",
    retirados: "#EF4444",
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewData((prev) => ({
      ...prev,
      [name]:
        name === "periodo" || name === "carrera" ? value : parseInt(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setData((prev) => [...prev, { id: prev.length + 1, ...newData }]);
    setIsModalOpen(false);
    setNewData({
      periodo: "",
      carrera: "",
      graduados: 0,
      admitidos: 0,
      matriculados: 0,
      retirados: 0,
    });
  };

  const periodos = Array.from(new Set(data.map((item) => item.periodo)));
  const carreras = Array.from(new Set(data.map((item) => item.carrera)));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow">
          <p className="font-bold">{`Período: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 border-b-4 border-blue-500 pb-2 inline-block">
          Estadísticas Estudiantiles
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label
              htmlFor="tipoEstadistica"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tipo de Estadística
            </label>
            <Select
              id="tipoEstadistica"
              onChange={(e) => setTipoEstadistica(e.target.value)}
              value={tipoEstadistica}
            >
              <option value="graduados">Graduados</option>
              <option value="admitidos">Admitidos</option>
              <option value="matriculados">Matriculados</option>
              <option value="retirados">Retirados</option>
            </Select>
          </div>
          <div>
            <label
              htmlFor="periodo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Período
            </label>
            <Select
              id="periodo"
              onChange={(e) => setPeriodo(e.target.value)}
              value={periodo}
            >
              <option value="todos">Todos los períodos</option>
              {periodos.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label
              htmlFor="carrera"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Carrera
            </label>
            <Select
              id="carrera"
              onChange={(e) => setCarrera(e.target.value)}
              value={carrera}
            >
              <option value="todas">Todas las carreras</option>
              {carreras.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Informacion</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Período</TableHead>
                  <TableHead>Carrera</TableHead>
                  <TableHead>
                    {tipoEstadistica.charAt(0).toUpperCase() +
                      tipoEstadistica.slice(1)}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {datosFiltrados.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.periodo}
                    </TableCell>
                    <TableCell>{item.carrera}</TableCell>
                    <TableCell>
                      {item[tipoEstadistica as keyof typeof item]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Gráfico de Barras</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={datosFiltrados}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="periodo" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    dataKey={tipoEstadistica}
                    fill={colores[tipoEstadistica as keyof typeof colores]}
                    name={
                      tipoEstadistica.charAt(0).toUpperCase() +
                      tipoEstadistica.slice(1)
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gráfico de Líneas</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={datosFiltrados}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="periodo" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={tipoEstadistica}
                    stroke={colores[tipoEstadistica as keyof typeof colores]}
                    name={
                      tipoEstadistica.charAt(0).toUpperCase() +
                      tipoEstadistica.slice(1)
                    }
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Agregar Nuevo Período
        </Button>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-blue-500 pb-2">
            Agregar Nuevo Período
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="periodo"
                className="block text-sm font-medium text-gray-700"
              >
                Período
              </label>
              <Input
                type="text"
                id="periodo"
                name="periodo"
                value={newData.periodo}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="carrera"
                className="block text-sm font-medium text-gray-700"
              >
                Carrera
              </label>
              <Select
                id="carrera"
                name="carrera"
                value={newData.carrera}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccione una carrera</option>
                {carreras.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label
                htmlFor="graduados"
                className="block text-sm font-medium text-gray-700"
              >
                Graduados
              </label>
              <Input
                type="number"
                id="graduados"
                name="graduados"
                value={newData.graduados}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="admitidos"
                className="block text-sm font-medium text-gray-700"
              >
                Admitidos
              </label>
              <Input
                type="number"
                id="admitidos"
                name="admitidos"
                value={newData.admitidos}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="matriculados"
                className="block text-sm font-medium text-gray-700"
              >
                Matriculados
              </label>
              <Input
                type="number"
                id="matriculados"
                name="matriculados"
                value={newData.matriculados}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="retirados"
                className="block text-sm font-medium text-gray-700"
              >
                Retirados
              </label>
              <Input
                type="number"
                id="retirados"
                name="retirados"
                value={newData.retirados}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Guardar
            </Button>
          </form>
        </Modal>
      </div>
    </div>
  );
}
