/**
 * DATOS BASE DE PRODUCCIÓN - SISTEMA CONTABLE SISCOB
 * Radio Móvil 15 de Abril (Tarija, Bolivia)
 * 
 * Configuración en blanco para inicio de operaciones limpias.
 * Todos los registros históricos anteriores han sido respaldados.
 */

// Padrón de Socios en Cero (Listo para registrar los socios reales)
export const INITIAL_SOCIOS = [
  {
    "id": 0,
    "nroMovil": "00",
    "nombres": "LUISA MARIELA",
    "apPaterno": "CASTRO",
    "apMaterno": "MIRANDA",
    "ci": "S/C-00",
    "celular": "",
    "fechaIngreso": "2019-11-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 00. Antigüedad: 6 años, 10 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-00",
        "fecha": "2019-11-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 1,
    "nroMovil": "01",
    "nombres": "DANIEL",
    "apPaterno": "DIAZ",
    "apMaterno": "CAMACHO",
    "ci": "S/C-01",
    "celular": "",
    "fechaIngreso": "2025-01-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 01. Antigüedad: 1 año, 8 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-01",
        "fecha": "2025-01-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 2,
    "nroMovil": "02",
    "nombres": "JOSE MANUEL",
    "apPaterno": "ACEBEY",
    "apMaterno": "ARMELLA",
    "ci": "S/C-02",
    "celular": "",
    "fechaIngreso": "2022-08-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 02. Antigüedad: 4 años, 1 mes (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-02",
        "fecha": "2022-08-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 3,
    "nroMovil": "03",
    "nombres": "JESUS ELVIO",
    "apPaterno": "ZENTENO",
    "apMaterno": "CRUZ",
    "ci": "S/C-03",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 03. Antigüedad: 14 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-03",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 4,
    "nroMovil": "04",
    "nombres": "DANIEL GUSTAVO",
    "apPaterno": "GIRA",
    "apMaterno": "HOYOS",
    "ci": "S/C-04",
    "celular": "",
    "fechaIngreso": "2018-03-05",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 04. Antigüedad: 8 años, 6 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-04",
        "fecha": "2018-03-05",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 5,
    "nroMovil": "05",
    "nombres": "LUIS FELIPE",
    "apPaterno": "FLORES",
    "apMaterno": "FERNANDEZ",
    "ci": "S/C-05",
    "celular": "",
    "fechaIngreso": "2016-07-04",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 05. Antigüedad: 10 años, 2 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-05",
        "fecha": "2016-07-04",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 6,
    "nroMovil": "06",
    "nombres": "REINALDO",
    "apPaterno": "DURAN",
    "apMaterno": "CAHUAYA",
    "ci": "S/C-06",
    "celular": "",
    "fechaIngreso": "2025-01-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 06. Antigüedad: 1 año, 8 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-06",
        "fecha": "2025-01-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 7,
    "nroMovil": "07",
    "nombres": "AGUSTIN",
    "apPaterno": "LOZANO",
    "apMaterno": "",
    "ci": "S/C-07",
    "celular": "",
    "fechaIngreso": "2016-01-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 07. Antigüedad: 10 años, 8 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-07",
        "fecha": "2016-01-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 8,
    "nroMovil": "08",
    "nombres": "RONAL EFRAIN",
    "apPaterno": "GUERRERO",
    "apMaterno": "DONAIRE",
    "ci": "S/C-08",
    "celular": "",
    "fechaIngreso": "2012-01-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 08. Antigüedad: 14 años, 8 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-08",
        "fecha": "2012-01-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 9,
    "nroMovil": "09",
    "nombres": "JUAN PABLO",
    "apPaterno": "GARZON",
    "apMaterno": "BALDIVIEZO",
    "ci": "S/C-09",
    "celular": "",
    "fechaIngreso": "2014-12-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 09. Antigüedad: 11 años, 9 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-09",
        "fecha": "2014-12-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 10,
    "nroMovil": "10",
    "nombres": "WILFREDO CEFERINO",
    "apPaterno": "BALDIVIEZO",
    "apMaterno": "ZENTENO",
    "ci": "S/C-10",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 10. Antigüedad: 14 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-10",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 11,
    "nroMovil": "11",
    "nombres": "JUAN CARLOS",
    "apPaterno": "LEMA",
    "apMaterno": "",
    "ci": "S/C-11",
    "celular": "",
    "fechaIngreso": "2014-01-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 11. Antigüedad: 12 años, 8 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-11",
        "fecha": "2014-01-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 13,
    "nroMovil": "13",
    "nombres": "LUIS FELIPE",
    "apPaterno": "FLORES",
    "apMaterno": "FERNANDEZ",
    "ci": "S/C-13",
    "celular": "",
    "fechaIngreso": "2016-07-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 13. Antigüedad: 10 años, 2 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-13",
        "fecha": "2016-07-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 14,
    "nroMovil": "14",
    "nombres": "YAMIL ALBINO",
    "apPaterno": "PADILLA",
    "apMaterno": "SURUGUAY",
    "ci": "S/C-14",
    "celular": "",
    "fechaIngreso": "2025-03-05",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 14. Antigüedad: 1 año, 6 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-14",
        "fecha": "2025-03-05",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 15,
    "nroMovil": "15",
    "nombres": "JOSE ALBERTO",
    "apPaterno": "ZENTENO",
    "apMaterno": "CRUZ",
    "ci": "S/C-15",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 15. Antigüedad: 14 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-15",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 16,
    "nroMovil": "16",
    "nombres": "JONAS",
    "apPaterno": "MORALES",
    "apMaterno": "AIRA",
    "ci": "S/C-16",
    "celular": "",
    "fechaIngreso": "2024-03-04",
    "estado": "BAJA",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 16. Antigüedad: 2 años, 6 meses (Est. Acc: Retirado).",
    "acciones": [
      {
        "id": "ACC-16",
        "fecha": "2024-03-04",
        "monto": 0.0,
        "estado": "BAJA",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 17,
    "nroMovil": "17",
    "nombres": "CLAUDIA ROSMERY",
    "apPaterno": "CASTRO",
    "apMaterno": "",
    "ci": "S/C-17",
    "celular": "",
    "fechaIngreso": "2018-05-05",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 17. Antigüedad: 8 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-17",
        "fecha": "2018-05-05",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 18,
    "nroMovil": "18",
    "nombres": "IGNACIO",
    "apPaterno": "AGUILAR",
    "apMaterno": "",
    "ci": "S/C-18",
    "celular": "",
    "fechaIngreso": "2025-09-08",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 18. Antigüedad: 11 meses, 26 días (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-18",
        "fecha": "2025-09-08",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 19,
    "nroMovil": "19",
    "nombres": "REINALDO",
    "apPaterno": "DURAN",
    "apMaterno": "CAHUAYA",
    "ci": "S/C-19",
    "celular": "",
    "fechaIngreso": "2019-12-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 19. Antigüedad: 6 años, 9 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-19",
        "fecha": "2019-12-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 20,
    "nroMovil": "20",
    "nombres": "NEVER",
    "apPaterno": "GUERRERO",
    "apMaterno": "DOANIRE",
    "ci": "S/C-20",
    "celular": "",
    "fechaIngreso": "2022-01-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 20. Antigüedad: 4 años, 8 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-20",
        "fecha": "2022-01-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 21,
    "nroMovil": "21",
    "nombres": "HERNAN",
    "apPaterno": "RIVERA",
    "apMaterno": "ROMERO",
    "ci": "S/C-21",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 21. Antigüedad: 14 años, 4 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-21",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 22,
    "nroMovil": "22",
    "nombres": "GABRIEL EULALIO",
    "apPaterno": "PERALES",
    "apMaterno": "ROBLES",
    "ci": "S/C-22",
    "celular": "",
    "fechaIngreso": "2024-08-04",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 22. Antigüedad: 2 años, 1 mes (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-22",
        "fecha": "2024-08-04",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 23,
    "nroMovil": "23",
    "nombres": "REYNALDO",
    "apPaterno": "DURAN",
    "apMaterno": "CAHUAYA",
    "ci": "S/C-23",
    "celular": "",
    "fechaIngreso": "2019-12-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 23. Antigüedad: 6 años, 9 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-23",
        "fecha": "2019-12-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 24,
    "nroMovil": "24",
    "nombres": "VLADIMIR FERNANDO",
    "apPaterno": "LOPEZ",
    "apMaterno": "RODRIGUEZ",
    "ci": "S/C-24",
    "celular": "",
    "fechaIngreso": "2014-03-05",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 24. Antigüedad: 12 años, 6 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-24",
        "fecha": "2014-03-05",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 25,
    "nroMovil": "25",
    "nombres": "EDWIN",
    "apPaterno": "FIGUEROA",
    "apMaterno": "FERNANDEZ",
    "ci": "S/C-25",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 25. Antigüedad: 14 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-25",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 26,
    "nroMovil": "26",
    "nombres": "JACINTA",
    "apPaterno": "FIGUEROA",
    "apMaterno": "FERNANDEZ",
    "ci": "S/C-26",
    "celular": "",
    "fechaIngreso": "2023-07-05",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 26. Antigüedad: 3 años, 2 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-26",
        "fecha": "2023-07-05",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 27,
    "nroMovil": "27",
    "nombres": "IGNACIO",
    "apPaterno": "AGUILAR",
    "apMaterno": "",
    "ci": "S/C-27",
    "celular": "",
    "fechaIngreso": "2023-02-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 27. Antigüedad: 3 años, 7 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-27",
        "fecha": "2023-02-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 28,
    "nroMovil": "28",
    "nombres": "EDITH",
    "apPaterno": "ZENTENO",
    "apMaterno": "MERCADO",
    "ci": "S/C-28",
    "celular": "",
    "fechaIngreso": "2014-02-02",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 28. Antigüedad: 12 años, 7 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-28",
        "fecha": "2014-02-02",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 29,
    "nroMovil": "29",
    "nombres": "MOISES",
    "apPaterno": "OCAMPO",
    "apMaterno": "SERRUDO",
    "ci": "S/C-29",
    "celular": "",
    "fechaIngreso": "2016-09-03",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 29. Antigüedad: 10 años (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-29",
        "fecha": "2016-09-03",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 30,
    "nroMovil": "30",
    "nombres": "ARMANDO FAUSTO",
    "apPaterno": "AGUILAR",
    "apMaterno": "ALCALA",
    "ci": "S/C-30",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 30. Antigüedad: 14 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-30",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 31,
    "nroMovil": "31",
    "nombres": "AGUSTIN",
    "apPaterno": "LOZANO",
    "apMaterno": "",
    "ci": "S/C-31",
    "celular": "",
    "fechaIngreso": "2016-01-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 31. Antigüedad: 10 años, 8 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-31",
        "fecha": "2016-01-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 32,
    "nroMovil": "32",
    "nombres": "YADITH YESICA",
    "apPaterno": "BOLIVAR",
    "apMaterno": "CHOQUE",
    "ci": "S/C-32",
    "celular": "",
    "fechaIngreso": "2016-01-03",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 32. Antigüedad: 10 años, 8 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-32",
        "fecha": "2016-01-03",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 33,
    "nroMovil": "33",
    "nombres": "EDITH",
    "apPaterno": "ZENTENO",
    "apMaterno": "MERCADO",
    "ci": "S/C-33",
    "celular": "",
    "fechaIngreso": "2024-12-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 33. Antigüedad: 1 año, 9 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-33",
        "fecha": "2024-12-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 34,
    "nroMovil": "34",
    "nombres": "ENRIQUE",
    "apPaterno": "RIOS",
    "apMaterno": "MIRANDA",
    "ci": "S/C-34",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 34. Antigüedad: 14 años, 4 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-34",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 35,
    "nroMovil": "35",
    "nombres": "EFRAIN",
    "apPaterno": "CASTRO",
    "apMaterno": "CONDORI",
    "ci": "S/C-35",
    "celular": "",
    "fechaIngreso": "2023-10-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 35. Antigüedad: 2 años, 11 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-35",
        "fecha": "2023-10-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 36,
    "nroMovil": "36",
    "nombres": "JOSE ALBERTO",
    "apPaterno": "ZENTENO",
    "apMaterno": "CRUZ",
    "ci": "S/C-36",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 36. Antigüedad: 14 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-36",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 37,
    "nroMovil": "37",
    "nombres": "GONZALO JAVIER",
    "apPaterno": "ZENTENO",
    "apMaterno": "RIOS",
    "ci": "S/C-37",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 37. Antigüedad: 14 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-37",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 38,
    "nroMovil": "38",
    "nombres": "ISMAEL",
    "apPaterno": "ZENTENO",
    "apMaterno": "VELASQUEZ",
    "ci": "S/C-38",
    "celular": "",
    "fechaIngreso": "2022-12-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 38. Antigüedad: 3 años, 9 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-38",
        "fecha": "2022-12-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 39,
    "nroMovil": "39",
    "nombres": "ALVARO FERNANDO",
    "apPaterno": "ARMELLA",
    "apMaterno": "VARGAS",
    "ci": "S/C-39",
    "celular": "",
    "fechaIngreso": "2017-02-02",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 39. Antigüedad: 9 años, 7 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-39",
        "fecha": "2017-02-02",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 40,
    "nroMovil": "40",
    "nombres": "WILFREDO CEFERINO",
    "apPaterno": "BALDIVIEZO",
    "apMaterno": "ZENTENO",
    "ci": "S/C-40",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 40. Antigüedad: 14 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-40",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 41,
    "nroMovil": "41",
    "nombres": "EDMUNDO",
    "apPaterno": "MAMANI",
    "apMaterno": "RASGUIDO",
    "ci": "S/C-41",
    "celular": "",
    "fechaIngreso": "2012-07-04",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 41. Antigüedad: 14 años, 2 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-41",
        "fecha": "2012-07-04",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 42,
    "nroMovil": "42",
    "nombres": "HIGINIO ALEJANDRO",
    "apPaterno": "GARECA",
    "apMaterno": "MICHEL",
    "ci": "S/C-42",
    "celular": "",
    "fechaIngreso": "2026-05-31",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 42. Antigüedad: 3 meses, 4 días (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-42",
        "fecha": "2026-05-31",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 43,
    "nroMovil": "43",
    "nombres": "HERNAN",
    "apPaterno": "RIVERA",
    "apMaterno": "ROMERO",
    "ci": "S/C-43",
    "celular": "",
    "fechaIngreso": "2022-09-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 43. Antigüedad: 4 años (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-43",
        "fecha": "2022-09-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 44,
    "nroMovil": "44",
    "nombres": "LIDIA",
    "apPaterno": "FIGUEROA",
    "apMaterno": "FERNANDEZ",
    "ci": "S/C-44",
    "celular": "",
    "fechaIngreso": "2014-07-05",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 44. Antigüedad: 12 años, 2 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-44",
        "fecha": "2014-07-05",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 45,
    "nroMovil": "45",
    "nombres": "VLADIMIR FERNANDO",
    "apPaterno": "LOPEZ",
    "apMaterno": "RODRIGUEZ",
    "ci": "S/C-45",
    "celular": "",
    "fechaIngreso": "2014-03-05",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 45. Antigüedad: 12 años, 6 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-45",
        "fecha": "2014-03-05",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 46,
    "nroMovil": "46",
    "nombres": "VICTOR HUGO",
    "apPaterno": "VARGAS",
    "apMaterno": "FLORES",
    "ci": "S/C-46",
    "celular": "",
    "fechaIngreso": "2012-08-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 46. Antigüedad: 14 años, 1 mes (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-46",
        "fecha": "2012-08-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 47,
    "nroMovil": "47",
    "nombres": "DANIEL GUSTAVO",
    "apPaterno": "GIRA",
    "apMaterno": "HOYOS",
    "ci": "S/C-47",
    "celular": "",
    "fechaIngreso": "2025-12-29",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 47. Antigüedad: 8 meses, 5 días (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-47",
        "fecha": "2025-12-29",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 48,
    "nroMovil": "48",
    "nombres": "CLEYBER",
    "apPaterno": "GONZALES",
    "apMaterno": "PANIQUE",
    "ci": "S/C-48",
    "celular": "",
    "fechaIngreso": "2025-12-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 48. Antigüedad: 2026 años, 9 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-48",
        "fecha": "2025-12-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 49,
    "nroMovil": "49",
    "nombres": "ROXANA",
    "apPaterno": "FLORES",
    "apMaterno": "ANGELO",
    "ci": "S/C-49",
    "celular": "",
    "fechaIngreso": "2019-12-04",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 49. Antigüedad: 6 años, 9 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-49",
        "fecha": "2019-12-04",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 50,
    "nroMovil": "50",
    "nombres": "MAXIMO",
    "apPaterno": "RUEDA",
    "apMaterno": "AGUIRRE",
    "ci": "S/C-50",
    "celular": "",
    "fechaIngreso": "2023-10-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 50. Antigüedad: 2 años, 11 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-50",
        "fecha": "2023-10-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 51,
    "nroMovil": "51",
    "nombres": "LINDOLFO",
    "apPaterno": "LOPEZ",
    "apMaterno": "HOYOS",
    "ci": "S/C-51",
    "celular": "",
    "fechaIngreso": "2025-09-08",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 51. Antigüedad: 11 meses, 26 días (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-51",
        "fecha": "2025-09-08",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 52,
    "nroMovil": "52",
    "nombres": "LIDIA",
    "apPaterno": "FIGUEROA",
    "apMaterno": "FERNANDEZ",
    "ci": "S/C-52",
    "celular": "",
    "fechaIngreso": "2014-07-05",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 52. Antigüedad: 12 años, 2 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-52",
        "fecha": "2014-07-05",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 53,
    "nroMovil": "53",
    "nombres": "HENRY ALBERTO",
    "apPaterno": "ORTEGA",
    "apMaterno": "CAMACHO",
    "ci": "S/C-53",
    "celular": "",
    "fechaIngreso": "2018-09-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 53. Antigüedad: 8 años (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-53",
        "fecha": "2018-09-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 54,
    "nroMovil": "54",
    "nombres": "DAVID",
    "apPaterno": "PACHECO",
    "apMaterno": "AGUAYO",
    "ci": "S/C-54",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 54. Antigüedad: 14 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-54",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 55,
    "nroMovil": "55",
    "nombres": "CLAUDIA ROSMERY",
    "apPaterno": "CASTRO",
    "apMaterno": "",
    "ci": "S/C-55",
    "celular": "",
    "fechaIngreso": "2018-05-05",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 55. Antigüedad: 8 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-55",
        "fecha": "2018-05-05",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 56,
    "nroMovil": "56",
    "nombres": "LUISA MARIELA",
    "apPaterno": "CASTRO",
    "apMaterno": "MIRANDA",
    "ci": "S/C-56",
    "celular": "",
    "fechaIngreso": "2019-11-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 56. Antigüedad: 6 años, 10 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-56",
        "fecha": "2019-11-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 57,
    "nroMovil": "57",
    "nombres": "VIRGINIA",
    "apPaterno": "MERCADO",
    "apMaterno": "ARRAYA",
    "ci": "S/C-57",
    "celular": "",
    "fechaIngreso": "2024-11-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 57. Antigüedad: 1 año, 10 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-57",
        "fecha": "2024-11-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 58,
    "nroMovil": "58",
    "nombres": "NEVER RUBEN",
    "apPaterno": "ESTRADA",
    "apMaterno": "HUARACHI",
    "ci": "S/C-58",
    "celular": "",
    "fechaIngreso": "2023-09-04",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 58. Antigüedad: 3 años (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-58",
        "fecha": "2023-09-04",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 59,
    "nroMovil": "59",
    "nombres": "FREDY",
    "apPaterno": "YARECA",
    "apMaterno": "OCAMPO",
    "ci": "S/C-59",
    "celular": "",
    "fechaIngreso": "2013-07-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 59. Antigüedad: 13 años, 2 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-59",
        "fecha": "2013-07-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 60,
    "nroMovil": "60",
    "nombres": "JUAN CARLOS",
    "apPaterno": "SORUCO",
    "apMaterno": "VIDAURRE",
    "ci": "S/C-60",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 60. Antigüedad: 14 años, 4 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-60",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 61,
    "nroMovil": "61",
    "nombres": "CRISTIAN SERGIO",
    "apPaterno": "ARAGON",
    "apMaterno": "SANCHEZ",
    "ci": "S/C-61",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 61. Antigüedad: 14 años, 4 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-61",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 62,
    "nroMovil": "62",
    "nombres": "EDWIN",
    "apPaterno": "FIGUEROA",
    "apMaterno": "FERNANDEZ",
    "ci": "S/C-62",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 62. Antigüedad: 14 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-62",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 63,
    "nroMovil": "63",
    "nombres": "AUGUSTO",
    "apPaterno": "RUEDA",
    "apMaterno": "FERNANDEZ",
    "ci": "S/C-63",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 63. Antigüedad: 14 años, 4 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-63",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 64,
    "nroMovil": "64",
    "nombres": "JUAN PABLO",
    "apPaterno": "VASQUEZ",
    "apMaterno": "",
    "ci": "S/C-64",
    "celular": "",
    "fechaIngreso": "2019-03-05",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 64. Antigüedad: 7 años, 6 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-64",
        "fecha": "2019-03-05",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 66,
    "nroMovil": "66",
    "nombres": "ALEJANDRO",
    "apPaterno": "RODRIGUEZ",
    "apMaterno": "ORTIZ",
    "ci": "S/C-66",
    "celular": "",
    "fechaIngreso": "2013-08-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 66. Antigüedad: 13 años, 1 mes (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-66",
        "fecha": "2013-08-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 67,
    "nroMovil": "67",
    "nombres": "JESUS ELVIO",
    "apPaterno": "ZENTENO",
    "apMaterno": "CRUZ",
    "ci": "S/C-67",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 67. Antigüedad: 14 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-67",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 68,
    "nroMovil": "68",
    "nombres": "CARMEN ROSA",
    "apPaterno": "MENDEZ",
    "apMaterno": "DIAZ",
    "ci": "S/C-68",
    "celular": "",
    "fechaIngreso": "2025-12-02",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 68. Antigüedad: 9 meses, 2 días (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-68",
        "fecha": "2025-12-02",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 69,
    "nroMovil": "69",
    "nombres": "JOSE ALBERTO",
    "apPaterno": "ZENTENO",
    "apMaterno": "CRUZ",
    "ci": "S/C-69",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 69. Antigüedad: 14 años, 4 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-69",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 70,
    "nroMovil": "70",
    "nombres": "CLAUDIA ROSMERY",
    "apPaterno": "CASTRO",
    "apMaterno": "",
    "ci": "S/C-70",
    "celular": "",
    "fechaIngreso": "2018-05-05",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 70. Antigüedad: 8 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-70",
        "fecha": "2018-05-05",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 71,
    "nroMovil": "71",
    "nombres": "LUIS FERNANDO",
    "apPaterno": "AGUILAR",
    "apMaterno": "VILTE",
    "ci": "S/C-71",
    "celular": "",
    "fechaIngreso": "2025-07-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 71. Antigüedad: 1 año, 2 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-71",
        "fecha": "2025-07-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 72,
    "nroMovil": "72",
    "nombres": "ROBERTO",
    "apPaterno": "CRUZ",
    "apMaterno": "",
    "ci": "S/C-72",
    "celular": "",
    "fechaIngreso": "2016-04-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 72. Antigüedad: 10 años, 5 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-72",
        "fecha": "2016-04-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 73,
    "nroMovil": "73",
    "nombres": "GEOVANA",
    "apPaterno": "FERNANDEZ",
    "apMaterno": "FIGUEROA",
    "ci": "S/C-73",
    "celular": "",
    "fechaIngreso": "2024-12-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 73. Antigüedad: 1 año, 9 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-73",
        "fecha": "2024-12-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 74,
    "nroMovil": "74",
    "nombres": "DANIEL ALBERTO",
    "apPaterno": "HOYOS",
    "apMaterno": "ROMERO",
    "ci": "S/C-74",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 74. Antigüedad: 14 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-74",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 75,
    "nroMovil": "75",
    "nombres": "ADENUL",
    "apPaterno": "MIRANDA",
    "apMaterno": "LOPEZ",
    "ci": "S/C-75",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 75. Antigüedad: 14 años, 4 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-75",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 76,
    "nroMovil": "76",
    "nombres": "EDWARD",
    "apPaterno": "ESTRADA",
    "apMaterno": "",
    "ci": "S/C-76",
    "celular": "",
    "fechaIngreso": "2024-07-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 76. Antigüedad: 2 años, 2 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-76",
        "fecha": "2024-07-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 77,
    "nroMovil": "77",
    "nombres": "JOSE ALBERTO",
    "apPaterno": "ZENTENO",
    "apMaterno": "CRUZ",
    "ci": "S/C-77",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 77. Antigüedad: 14 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-77",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 78,
    "nroMovil": "78",
    "nombres": "SIMAR",
    "apPaterno": "DIAZ",
    "apMaterno": "MIRAVAL",
    "ci": "S/C-78",
    "celular": "",
    "fechaIngreso": "2023-11-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 78. Antigüedad: 2 años, 10 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-78",
        "fecha": "2023-11-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 79,
    "nroMovil": "79",
    "nombres": "RODRIGO",
    "apPaterno": "TORREZ",
    "apMaterno": "CARDOZO",
    "ci": "S/C-79",
    "celular": "",
    "fechaIngreso": "2017-10-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 79. Antigüedad: 8 años, 11 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-79",
        "fecha": "2017-10-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 80,
    "nroMovil": "80",
    "nombres": "DAVID",
    "apPaterno": "PACHECO",
    "apMaterno": "AGUAYO",
    "ci": "S/C-80",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 80. Antigüedad: 14 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-80",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 81,
    "nroMovil": "81",
    "nombres": "JUAN CARLOS",
    "apPaterno": "GUERRERO",
    "apMaterno": "GUDIÑO",
    "ci": "S/C-81",
    "celular": "",
    "fechaIngreso": "2011-12-04",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 81. Antigüedad: 14 años, 9 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-81",
        "fecha": "2011-12-04",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 82,
    "nroMovil": "82",
    "nombres": "GONZALO JAVIER",
    "apPaterno": "ZENTENO",
    "apMaterno": "RIOS",
    "ci": "S/C-82",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 82. Antigüedad: 14 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-82",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 83,
    "nroMovil": "83",
    "nombres": "LUISA MARIELA",
    "apPaterno": "CASTRO",
    "apMaterno": "MIRANDA",
    "ci": "S/C-83",
    "celular": "",
    "fechaIngreso": "2019-11-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 83. Antigüedad: 6 años, 10 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-83",
        "fecha": "2019-11-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 84,
    "nroMovil": "84",
    "nombres": "ISMAEL",
    "apPaterno": "ZENTENO",
    "apMaterno": "VELASQUEZ",
    "ci": "S/C-84",
    "celular": "",
    "fechaIngreso": "2012-07-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 84. Antigüedad: 14 años, 2 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-84",
        "fecha": "2012-07-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 85,
    "nroMovil": "85",
    "nombres": "DANIEL ALBERTO",
    "apPaterno": "HOYOS",
    "apMaterno": "ROMERO",
    "ci": "S/C-85",
    "celular": "",
    "fechaIngreso": "2024-08-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 85. Antigüedad: 2 años, 1 mes (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-85",
        "fecha": "2024-08-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 86,
    "nroMovil": "86",
    "nombres": "GUSTAVO",
    "apPaterno": "CHINURI",
    "apMaterno": "GONZALES",
    "ci": "S/C-86",
    "celular": "",
    "fechaIngreso": "2025-09-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 86. Antigüedad: 1 año (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-86",
        "fecha": "2025-09-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 87,
    "nroMovil": "87",
    "nombres": "JOSE LUIS",
    "apPaterno": "CRUZ",
    "apMaterno": "RAMIREZ",
    "ci": "S/C-87",
    "celular": "",
    "fechaIngreso": "2020-02-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 87. Antigüedad: 6 años, 7 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-87",
        "fecha": "2020-02-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 88,
    "nroMovil": "88",
    "nombres": "LIDIA",
    "apPaterno": "FIGUEROA",
    "apMaterno": "FERNANDEZ",
    "ci": "S/C-88",
    "celular": "",
    "fechaIngreso": "2012-01-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 88. Antigüedad: 14 años, 8 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-88",
        "fecha": "2012-01-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 89,
    "nroMovil": "89",
    "nombres": "CARLOS MIGUEL",
    "apPaterno": "DUARTE",
    "apMaterno": "VARGAS",
    "ci": "S/C-89",
    "celular": "",
    "fechaIngreso": "2025-01-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 89. Antigüedad: 1 año, 8 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-89",
        "fecha": "2025-01-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 90,
    "nroMovil": "90",
    "nombres": "JUAN PABLO",
    "apPaterno": "HERBAS",
    "apMaterno": "VEIZAGA",
    "ci": "S/C-90",
    "celular": "",
    "fechaIngreso": "2018-10-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 90. Antigüedad: 7 años, 11 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-90",
        "fecha": "2018-10-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 91,
    "nroMovil": "91",
    "nombres": "ADENUL",
    "apPaterno": "MIRANDA",
    "apMaterno": "LOPEZ",
    "ci": "S/C-91",
    "celular": "",
    "fechaIngreso": "2011-12-04",
    "estado": "BAJA",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 91. Antigüedad: 14 años, 9 meses (Est. Acc: Retirado).",
    "acciones": [
      {
        "id": "ACC-91",
        "fecha": "2011-12-04",
        "monto": 0.0,
        "estado": "BAJA",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 92,
    "nroMovil": "92",
    "nombres": "LEONEL FERNANDO",
    "apPaterno": "GUDIÑO",
    "apMaterno": "DIAZ",
    "ci": "S/C-92",
    "celular": "",
    "fechaIngreso": "2024-10-03",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 92. Antigüedad: 1 año, 11 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-92",
        "fecha": "2024-10-03",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 93,
    "nroMovil": "93",
    "nombres": "WILSON",
    "apPaterno": "SOLANO",
    "apMaterno": "MERCADO",
    "ci": "S/C-93",
    "celular": "",
    "fechaIngreso": "2024-10-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 93. Antigüedad: 1 año, 11 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-93",
        "fecha": "2024-10-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 94,
    "nroMovil": "94",
    "nombres": "SIMAR",
    "apPaterno": "DIAZ",
    "apMaterno": "MIRAVAL",
    "ci": "S/C-94",
    "celular": "",
    "fechaIngreso": "2016-06-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 94. Antigüedad: 10 años, 3 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-94",
        "fecha": "2016-06-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 95,
    "nroMovil": "95",
    "nombres": "IBER JAIME",
    "apPaterno": "CONDORI",
    "apMaterno": "GUTIERREZ",
    "ci": "S/C-95",
    "celular": "",
    "fechaIngreso": "2013-03-05",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 95. Antigüedad: 13 años, 6 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-95",
        "fecha": "2013-03-05",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 96,
    "nroMovil": "96",
    "nombres": "ISMAEL",
    "apPaterno": "MENDOZA",
    "apMaterno": "",
    "ci": "S/C-96",
    "celular": "",
    "fechaIngreso": "2012-06-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 96. Antigüedad: 14 años, 3 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-96",
        "fecha": "2012-06-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 97,
    "nroMovil": "97",
    "nombres": "MARCO ANTONIO",
    "apPaterno": "MORALES",
    "apMaterno": "QUISPE",
    "ci": "S/C-97",
    "celular": "",
    "fechaIngreso": "2019-04-05",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 97. Antigüedad: 7 años, 5 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-97",
        "fecha": "2019-04-05",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 98,
    "nroMovil": "98",
    "nombres": "GISSELA BELEN",
    "apPaterno": "CLEMENTE",
    "apMaterno": "MAMANI",
    "ci": "S/C-98",
    "celular": "",
    "fechaIngreso": "2025-02-02",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 98. Antigüedad: 1 año, 7 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-98",
        "fecha": "2025-02-02",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 99,
    "nroMovil": "99",
    "nombres": "DANIEL ALBERTO",
    "apPaterno": "HOYOS",
    "apMaterno": "ROMERO",
    "ci": "S/C-99",
    "celular": "",
    "fechaIngreso": "2024-08-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 99. Antigüedad: 2 años, 1 mes (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-99",
        "fecha": "2024-08-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 100,
    "nroMovil": "100",
    "nombres": "MOGUEL ANGEL",
    "apPaterno": "GIRA",
    "apMaterno": "HOYOS",
    "ci": "S/C-100",
    "celular": "",
    "fechaIngreso": "2016-04-04",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 100. Antigüedad: 10 años, 5 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-100",
        "fecha": "2016-04-04",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 101,
    "nroMovil": "101",
    "nombres": "GERSON",
    "apPaterno": "OTONDO",
    "apMaterno": "IBARRA",
    "ci": "S/C-101",
    "celular": "",
    "fechaIngreso": "2012-08-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 101. Antigüedad: 14 años, 1 mes (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-101",
        "fecha": "2012-08-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 102,
    "nroMovil": "102",
    "nombres": "VLADIMIR",
    "apPaterno": "TORREZ",
    "apMaterno": "MAMANI",
    "ci": "S/C-102",
    "celular": "",
    "fechaIngreso": "2025-09-08",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 102. Antigüedad: 11 meses, 26 días (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-102",
        "fecha": "2025-09-08",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 103,
    "nroMovil": "103",
    "nombres": "WILLIAM",
    "apPaterno": "TRUJILLO",
    "apMaterno": "VILLCA",
    "ci": "S/C-103",
    "celular": "",
    "fechaIngreso": "2024-09-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 103. Antigüedad: 2 años (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-103",
        "fecha": "2024-09-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 104,
    "nroMovil": "104",
    "nombres": "ISIDORO",
    "apPaterno": "ROMERO",
    "apMaterno": "TARRAGA",
    "ci": "S/C-104",
    "celular": "",
    "fechaIngreso": "2012-09-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 104. Antigüedad: 14 años (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-104",
        "fecha": "2012-09-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 105,
    "nroMovil": "105",
    "nombres": "CARLOS MIGUEL",
    "apPaterno": "DUARTE",
    "apMaterno": "VARGAS",
    "ci": "S/C-105",
    "celular": "",
    "fechaIngreso": "2018-10-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 105. Antigüedad: 7 años, 11 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-105",
        "fecha": "2018-10-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 106,
    "nroMovil": "106",
    "nombres": "RAMIRO",
    "apPaterno": "ESPINOZA",
    "apMaterno": "RUIZ",
    "ci": "S/C-106",
    "celular": "",
    "fechaIngreso": "2023-03-05",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 106. Antigüedad: 3 años, 6 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-106",
        "fecha": "2023-03-05",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 107,
    "nroMovil": "107",
    "nombres": "CARLOS ALBERTO",
    "apPaterno": "ARROYO",
    "apMaterno": "",
    "ci": "S/C-107",
    "celular": "",
    "fechaIngreso": "2012-08-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 107. Antigüedad: 14 años, 1 mes (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-107",
        "fecha": "2012-08-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 108,
    "nroMovil": "108",
    "nombres": "CLAUDIA ROSMERY",
    "apPaterno": "CASTRO",
    "apMaterno": "",
    "ci": "S/C-108",
    "celular": "",
    "fechaIngreso": "2018-05-05",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 108. Antigüedad: 8 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-108",
        "fecha": "2018-05-05",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 109,
    "nroMovil": "109",
    "nombres": "WILFREDO CEFERINO",
    "apPaterno": "BALDIVIEZO",
    "apMaterno": "ZENTENO",
    "ci": "S/C-109",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 109. Antigüedad: 14 años, 4 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-109",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 110,
    "nroMovil": "110",
    "nombres": "LUIS FERNANDO",
    "apPaterno": "RIVERA",
    "apMaterno": "OVANDO",
    "ci": "S/C-110",
    "celular": "",
    "fechaIngreso": "2026-05-21",
    "estado": "BAJA",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 110. Antigüedad: 3 meses, 14 días (Est. Acc: Retirado).",
    "acciones": [
      {
        "id": "ACC-110",
        "fecha": "2026-05-21",
        "monto": 0.0,
        "estado": "BAJA",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 111,
    "nroMovil": "111",
    "nombres": "CLEYBER",
    "apPaterno": "GONZALES",
    "apMaterno": "PANIQUE",
    "ci": "S/C-111",
    "celular": "",
    "fechaIngreso": "2026-06-30",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 111. Antigüedad: 2 meses, 5 días (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-111",
        "fecha": "2026-06-30",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 113,
    "nroMovil": "113",
    "nombres": "YAMIL",
    "apPaterno": "MILLAN",
    "apMaterno": "HOYOS",
    "ci": "S/C-113",
    "celular": "",
    "fechaIngreso": "2023-09-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 113. Antigüedad: 3 años (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-113",
        "fecha": "2023-09-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 114,
    "nroMovil": "114",
    "nombres": "RAMIRO",
    "apPaterno": "ESPINOZA",
    "apMaterno": "RUIZ",
    "ci": "S/C-114",
    "celular": "",
    "fechaIngreso": "2023-03-05",
    "estado": "BAJA",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 114. Antigüedad: 3 años, 6 meses (Est. Acc: Retirado).",
    "acciones": [
      {
        "id": "ACC-114",
        "fecha": "2023-03-05",
        "monto": 0.0,
        "estado": "BAJA",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 115,
    "nroMovil": "115",
    "nombres": "ISMAEL",
    "apPaterno": "ZENTENO",
    "apMaterno": "VELASQUEZ",
    "ci": "S/C-115",
    "celular": "",
    "fechaIngreso": "2012-07-04",
    "estado": "BAJA",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 115. Antigüedad: 14 años, 2 meses (Est. Acc: Retirado).",
    "acciones": [
      {
        "id": "ACC-115",
        "fecha": "2012-07-04",
        "monto": 0.0,
        "estado": "BAJA",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 116,
    "nroMovil": "116",
    "nombres": "JUAN GABRIEL",
    "apPaterno": "PANTOJA",
    "apMaterno": "CHAVEZ",
    "ci": "S/C-116",
    "celular": "",
    "fechaIngreso": "2018-06-04",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 116. Antigüedad: 8 años, 3 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-116",
        "fecha": "2018-06-04",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 117,
    "nroMovil": "117",
    "nombres": "ARIEL",
    "apPaterno": "VILLAFUERTE",
    "apMaterno": "SORUCO",
    "ci": "S/C-117",
    "celular": "",
    "fechaIngreso": "2016-10-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 117. Antigüedad: 9 años, 11 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-117",
        "fecha": "2016-10-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 118,
    "nroMovil": "118",
    "nombres": "YURY MAURICIO",
    "apPaterno": "RODRIGUEZ",
    "apMaterno": "BARRO",
    "ci": "S/C-118",
    "celular": "",
    "fechaIngreso": "2021-11-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 118. Antigüedad: 4 años, 10 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-118",
        "fecha": "2021-11-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 119,
    "nroMovil": "119",
    "nombres": "JORGE LUIS",
    "apPaterno": "SERRANO",
    "apMaterno": "PADILLA",
    "ci": "S/C-119",
    "celular": "",
    "fechaIngreso": "2012-09-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 119. Antigüedad: 14 años (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-119",
        "fecha": "2012-09-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 120,
    "nroMovil": "120",
    "nombres": "GERSON",
    "apPaterno": "OTONDO",
    "apMaterno": "IBARRA",
    "ci": "S/C-120",
    "celular": "",
    "fechaIngreso": "2012-08-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 120. Antigüedad: 14 años, 1 mes (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-120",
        "fecha": "2012-08-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 121,
    "nroMovil": "121",
    "nombres": "ISMAEL",
    "apPaterno": "ZENTENO",
    "apMaterno": "VELASQUEZ",
    "ci": "S/C-121",
    "celular": "",
    "fechaIngreso": "2012-07-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 121. Antigüedad: 14 años, 2 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-121",
        "fecha": "2012-07-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 122,
    "nroMovil": "122",
    "nombres": "ALVARO FERNANDO",
    "apPaterno": "ARMELLA",
    "apMaterno": "VARGAS",
    "ci": "S/C-122",
    "celular": "",
    "fechaIngreso": "2017-02-02",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 122. Antigüedad: 9 años, 7 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-122",
        "fecha": "2017-02-02",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 123,
    "nroMovil": "123",
    "nombres": "EUGENIA MARISOL",
    "apPaterno": "RAMIREZ",
    "apMaterno": "CHOQUE",
    "ci": "S/C-123",
    "celular": "",
    "fechaIngreso": "2021-06-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 123. Antigüedad: 5 años, 3 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-123",
        "fecha": "2021-06-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 124,
    "nroMovil": "124",
    "nombres": "EDMUNDO",
    "apPaterno": "MAMANI",
    "apMaterno": "RASGUIDO",
    "ci": "S/C-124",
    "celular": "",
    "fechaIngreso": "2012-07-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 124. Antigüedad: 14 años, 2 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-124",
        "fecha": "2012-07-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 125,
    "nroMovil": "125",
    "nombres": "MOISES",
    "apPaterno": "OTONDO",
    "apMaterno": "IBARRA",
    "ci": "S/C-125",
    "celular": "",
    "fechaIngreso": "2017-12-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 125. Antigüedad: 8 años, 9 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-125",
        "fecha": "2017-12-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 126,
    "nroMovil": "126",
    "nombres": "PATRICIA",
    "apPaterno": "MOLLO",
    "apMaterno": "FLORES",
    "ci": "S/C-126",
    "celular": "",
    "fechaIngreso": "2012-09-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 126. Antigüedad: 14 años (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-126",
        "fecha": "2012-09-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 127,
    "nroMovil": "127",
    "nombres": "JUAN CARLOS",
    "apPaterno": "GUERRERO",
    "apMaterno": "GUDIÑO",
    "ci": "S/C-127",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 127. Antigüedad: 14 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-127",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 128,
    "nroMovil": "128",
    "nombres": "DAVID",
    "apPaterno": "CASTILLO",
    "apMaterno": "JEREZ",
    "ci": "S/C-128",
    "celular": "",
    "fechaIngreso": "2023-06-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 128. Antigüedad: 3 años, 3 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-128",
        "fecha": "2023-06-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 129,
    "nroMovil": "129",
    "nombres": "CRISTIAN ANTONIO",
    "apPaterno": "TORREZ",
    "apMaterno": "MAMANI",
    "ci": "S/C-129",
    "celular": "",
    "fechaIngreso": "2021-07-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 129. Antigüedad: 5 años, 2 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-129",
        "fecha": "2021-07-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 130,
    "nroMovil": "130",
    "nombres": "CRISTIAN ANTONIO",
    "apPaterno": "TORREZ",
    "apMaterno": "MAMANI",
    "ci": "S/C-130",
    "celular": "",
    "fechaIngreso": "2026-05-08",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 130. Antigüedad: 3 meses, 27 días (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-130",
        "fecha": "2026-05-08",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 131,
    "nroMovil": "131",
    "nombres": "ALVARO",
    "apPaterno": "AVILA",
    "apMaterno": "ARANCIBIA",
    "ci": "S/C-131",
    "celular": "",
    "fechaIngreso": "2026-07-10",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 131. Antigüedad: 1 mes, 25 días (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-131",
        "fecha": "2026-07-10",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 132,
    "nroMovil": "132",
    "nombres": "IGNACIO",
    "apPaterno": "AGUILAR",
    "apMaterno": "",
    "ci": "S/C-132",
    "celular": "",
    "fechaIngreso": "2025-01-03",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 132. Antigüedad: 1 año, 8 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-132",
        "fecha": "2025-01-03",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 133,
    "nroMovil": "133",
    "nombres": "DANIEL ALBERTO",
    "apPaterno": "HOYOS",
    "apMaterno": "ROMERO",
    "ci": "S/C-133",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 133. Antigüedad: 14 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-133",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 134,
    "nroMovil": "134",
    "nombres": "RICHAR ARMANDO",
    "apPaterno": "MERCADO",
    "apMaterno": "GIRON",
    "ci": "S/C-134",
    "celular": "",
    "fechaIngreso": "2017-09-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 134. Antigüedad: 9 años (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-134",
        "fecha": "2017-09-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 135,
    "nroMovil": "135",
    "nombres": "NILO",
    "apPaterno": "PLATA",
    "apMaterno": "JURADO",
    "ci": "S/C-135",
    "celular": "",
    "fechaIngreso": "2020-08-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 135. Antigüedad: 6 años, 1 mes (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-135",
        "fecha": "2020-08-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 136,
    "nroMovil": "136",
    "nombres": "JUAN GABRIEL",
    "apPaterno": "HOYOS",
    "apMaterno": "OLGUIN",
    "ci": "S/C-136",
    "celular": "",
    "fechaIngreso": "2020-06-04",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 136. Antigüedad: 6 años, 3 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-136",
        "fecha": "2020-06-04",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 137,
    "nroMovil": "137",
    "nombres": "AXEL YAMIL",
    "apPaterno": "MENDEZ",
    "apMaterno": "BATALLANOS",
    "ci": "S/C-137",
    "celular": "",
    "fechaIngreso": "2022-10-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 137. Antigüedad: 3 años, 11 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-137",
        "fecha": "2022-10-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 138,
    "nroMovil": "138",
    "nombres": "OSCAR LUIS",
    "apPaterno": "RIVERA",
    "apMaterno": "TEJERINA",
    "ci": "S/C-138",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 138. Antigüedad: 14 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-138",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 139,
    "nroMovil": "139",
    "nombres": "IGNACIO",
    "apPaterno": "AGUILAR",
    "apMaterno": "",
    "ci": "S/C-139",
    "celular": "",
    "fechaIngreso": "2024-10-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 139. Antigüedad: 1 año, 11 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-139",
        "fecha": "2024-10-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 140,
    "nroMovil": "140",
    "nombres": "DANIEL",
    "apPaterno": "DIAZ",
    "apMaterno": "CAMACHO",
    "ci": "S/C-140",
    "celular": "",
    "fechaIngreso": "2025-01-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 140. Antigüedad: 1 año, 8 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-140",
        "fecha": "2025-01-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 141,
    "nroMovil": "141",
    "nombres": "EFRAIN",
    "apPaterno": "IBAÑEZ",
    "apMaterno": "BAUTISTA",
    "ci": "S/C-141",
    "celular": "",
    "fechaIngreso": "2015-09-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 141. Antigüedad: 11 años (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-141",
        "fecha": "2015-09-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 142,
    "nroMovil": "142",
    "nombres": "EDWARD",
    "apPaterno": "ESTRADA",
    "apMaterno": "",
    "ci": "S/C-142",
    "celular": "",
    "fechaIngreso": "2024-07-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 142. Antigüedad: 2 años, 2 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-142",
        "fecha": "2024-07-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 143,
    "nroMovil": "143",
    "nombres": "MIGUEL ANGEL",
    "apPaterno": "ROMERO",
    "apMaterno": "",
    "ci": "S/C-143",
    "celular": "",
    "fechaIngreso": "2015-09-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 143. Antigüedad: 11 años (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-143",
        "fecha": "2015-09-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 144,
    "nroMovil": "144",
    "nombres": "LUISA MARIELA",
    "apPaterno": "CASTRO",
    "apMaterno": "MIRANDA",
    "ci": "S/C-144",
    "celular": "",
    "fechaIngreso": "2026-06-13",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 144. Antigüedad: 2 meses, 22 días (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-144",
        "fecha": "2026-06-13",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 145,
    "nroMovil": "145",
    "nombres": "MARISOL",
    "apPaterno": "MARTINEZ",
    "apMaterno": "MURUCHI",
    "ci": "S/C-145",
    "celular": "",
    "fechaIngreso": "2025-10-08",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 145. Antigüedad: 10 meses, 26 días (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-145",
        "fecha": "2025-10-08",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 147,
    "nroMovil": "147",
    "nombres": "OLIVER",
    "apPaterno": "VIDAURRE",
    "apMaterno": "HOYOS",
    "ci": "S/C-147",
    "celular": "",
    "fechaIngreso": "2020-08-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 147. Antigüedad: 6 años, 1 mes (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-147",
        "fecha": "2020-08-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 148,
    "nroMovil": "148",
    "nombres": "JAIME",
    "apPaterno": "ARROYO",
    "apMaterno": "SALINAS",
    "ci": "S/C-148",
    "celular": "",
    "fechaIngreso": "2017-02-02",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 148. Antigüedad: 9 años, 7 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-148",
        "fecha": "2017-02-02",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 149,
    "nroMovil": "149",
    "nombres": "ROLY",
    "apPaterno": "RAMOS",
    "apMaterno": "TEJERINA",
    "ci": "S/C-149",
    "celular": "",
    "fechaIngreso": "2016-01-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 149. Antigüedad: 10 años, 8 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-149",
        "fecha": "2016-01-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 150,
    "nroMovil": "150",
    "nombres": "EFRAIN",
    "apPaterno": "VERGARA",
    "apMaterno": "SORUCO",
    "ci": "S/C-150",
    "celular": "",
    "fechaIngreso": "2026-07-22",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 150. Antigüedad: 1 mes, 13 días (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-150",
        "fecha": "2026-07-22",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 151,
    "nroMovil": "151",
    "nombres": "DANIEL ALBERTO",
    "apPaterno": "HOYOS",
    "apMaterno": "ROMERO",
    "ci": "S/C-151",
    "celular": "",
    "fechaIngreso": "2024-08-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 151. Antigüedad: 2 años, 1 mes (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-151",
        "fecha": "2024-08-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 152,
    "nroMovil": "152",
    "nombres": "GODOLFREDO",
    "apPaterno": "AGUANTE",
    "apMaterno": "CABEZAS",
    "ci": "S/C-152",
    "celular": "",
    "fechaIngreso": "2016-09-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 152. Antigüedad: 10 años (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-152",
        "fecha": "2016-09-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 153,
    "nroMovil": "153",
    "nombres": "OLIVER",
    "apPaterno": "VIDAURRE",
    "apMaterno": "HOYOS",
    "ci": "S/C-153",
    "celular": "",
    "fechaIngreso": "2020-08-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 153. Antigüedad: 6 años, 1 mes (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-153",
        "fecha": "2020-08-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 154,
    "nroMovil": "154",
    "nombres": "EDWARD LORENZO",
    "apPaterno": "RODRIGUEZ",
    "apMaterno": "BARRIOS",
    "ci": "S/C-154",
    "celular": "",
    "fechaIngreso": "2019-09-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 154. Antigüedad: 7 años (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-154",
        "fecha": "2019-09-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 155,
    "nroMovil": "155",
    "nombres": "MAURICIO ELIAS",
    "apPaterno": "RUIZ",
    "apMaterno": "VIRACOCHA",
    "ci": "S/C-155",
    "celular": "",
    "fechaIngreso": "2018-06-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 155. Antigüedad: 8 años, 3 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-155",
        "fecha": "2018-06-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 156,
    "nroMovil": "156",
    "nombres": "ROBER YAGMAN",
    "apPaterno": "OTONDO",
    "apMaterno": "BEJARANO",
    "ci": "S/C-156",
    "celular": "",
    "fechaIngreso": "2021-06-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 156. Antigüedad: 5 años, 3 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-156",
        "fecha": "2021-06-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 158,
    "nroMovil": "158",
    "nombres": "RICARDO",
    "apPaterno": "QUISPE",
    "apMaterno": "DURAN",
    "ci": "S/C-158",
    "celular": "",
    "fechaIngreso": "2016-04-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 158. Antigüedad: 10 años, 5 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-158",
        "fecha": "2016-04-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 159,
    "nroMovil": "159",
    "nombres": "LUIS ALBERTO",
    "apPaterno": "GUDIÑO",
    "apMaterno": "MARTINEZ",
    "ci": "S/C-159",
    "celular": "",
    "fechaIngreso": "2015-09-04",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 159. Antigüedad: 11 años (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-159",
        "fecha": "2015-09-04",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 160,
    "nroMovil": "160",
    "nombres": "LUIS",
    "apPaterno": "COLQUE",
    "apMaterno": "",
    "ci": "S/C-160",
    "celular": "",
    "fechaIngreso": "2022-08-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 160. Antigüedad: 4 años, 1 mes (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-160",
        "fecha": "2022-08-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 161,
    "nroMovil": "161",
    "nombres": "TOMAS",
    "apPaterno": "GARCIA",
    "apMaterno": "JAVIER",
    "ci": "S/C-161",
    "celular": "",
    "fechaIngreso": "2016-12-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 161. Antigüedad: 9 años, 9 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-161",
        "fecha": "2016-12-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 163,
    "nroMovil": "163",
    "nombres": "DANIEL",
    "apPaterno": "OTONDO",
    "apMaterno": "ORTEGA",
    "ci": "S/C-163",
    "celular": "",
    "fechaIngreso": "2021-10-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 163. Antigüedad: 4 años, 11 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-163",
        "fecha": "2021-10-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 164,
    "nroMovil": "164",
    "nombres": "ROBER YAGMAN",
    "apPaterno": "OTONDO",
    "apMaterno": "BEJARANO",
    "ci": "S/C-164",
    "celular": "",
    "fechaIngreso": "2021-06-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 164. Antigüedad: 5 años, 3 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-164",
        "fecha": "2021-06-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 165,
    "nroMovil": "165",
    "nombres": "CARLOS MIGUEL",
    "apPaterno": "DUARTE",
    "apMaterno": "VARGAS",
    "ci": "S/C-165",
    "celular": "",
    "fechaIngreso": "2018-10-04",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 165. Antigüedad: 7 años, 11 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-165",
        "fecha": "2018-10-04",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 166,
    "nroMovil": "166",
    "nombres": "DAVID",
    "apPaterno": "PACHECO",
    "apMaterno": "AGUAYO",
    "ci": "S/C-166",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 166. Antigüedad: 14 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-166",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 168,
    "nroMovil": "168",
    "nombres": "NESTRO FABIAN",
    "apPaterno": "ARENAS",
    "apMaterno": "FLORES",
    "ci": "S/C-168",
    "celular": "",
    "fechaIngreso": "2023-11-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 168. Antigüedad: 2 años, 10 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-168",
        "fecha": "2023-11-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 169,
    "nroMovil": "169",
    "nombres": "LUIS FELIPE",
    "apPaterno": "FLORES",
    "apMaterno": "FERNANDEZ",
    "ci": "S/C-169",
    "celular": "",
    "fechaIngreso": "2016-07-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 169. Antigüedad: 10 años, 2 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-169",
        "fecha": "2016-07-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 170,
    "nroMovil": "170",
    "nombres": "VLADIMIR FERNANDO",
    "apPaterno": "LOPEZ",
    "apMaterno": "RODRIGUEZ",
    "ci": "S/C-170",
    "celular": "",
    "fechaIngreso": "2014-03-05",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 170. Antigüedad: 12 años, 6 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-170",
        "fecha": "2014-03-05",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 171,
    "nroMovil": "171",
    "nombres": "GODOLFREDO",
    "apPaterno": "AGUANTE",
    "apMaterno": "CABEZAS",
    "ci": "S/C-171",
    "celular": "",
    "fechaIngreso": "2016-09-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 171. Antigüedad: 10 años (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-171",
        "fecha": "2016-09-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 172,
    "nroMovil": "172",
    "nombres": "LIDIA",
    "apPaterno": "FIGUEROA",
    "apMaterno": "FERNANDEZ",
    "ci": "S/C-172",
    "celular": "",
    "fechaIngreso": "2014-07-05",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 172. Antigüedad: 12 años, 2 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-172",
        "fecha": "2014-07-05",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 173,
    "nroMovil": "173",
    "nombres": "ALVARO",
    "apPaterno": "AVILA",
    "apMaterno": "ARANCIBIA",
    "ci": "S/C-173",
    "celular": "",
    "fechaIngreso": "2019-01-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 173. Antigüedad: 7 años, 8 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-173",
        "fecha": "2019-01-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 174,
    "nroMovil": "174",
    "nombres": "ROLANDO JIMMY",
    "apPaterno": "MAMANI",
    "apMaterno": "SORUCO",
    "ci": "S/C-174",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 174. Antigüedad: 14 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-174",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 175,
    "nroMovil": "175",
    "nombres": "JUAN GABRIEL",
    "apPaterno": "GUTIERREZ",
    "apMaterno": "VALDEZ",
    "ci": "S/C-175",
    "celular": "",
    "fechaIngreso": "2023-12-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 175. Antigüedad: 2 años, 9 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-175",
        "fecha": "2023-12-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 176,
    "nroMovil": "176",
    "nombres": "MAYRA DANIELA",
    "apPaterno": "GARECA",
    "apMaterno": "JEREZ",
    "ci": "S/C-176",
    "celular": "",
    "fechaIngreso": "2019-05-05",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 176. Antigüedad: 7 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-176",
        "fecha": "2019-05-05",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 177,
    "nroMovil": "177",
    "nombres": "MARCO ANTONIO",
    "apPaterno": "RODRIGUEZ",
    "apMaterno": "",
    "ci": "S/C-177",
    "celular": "",
    "fechaIngreso": "2023-06-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 177. Antigüedad: 3 años, 3 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-177",
        "fecha": "2023-06-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 178,
    "nroMovil": "178",
    "nombres": "JORGE",
    "apPaterno": "CALIZAYA",
    "apMaterno": "FLORES",
    "ci": "S/C-178",
    "celular": "",
    "fechaIngreso": "2016-10-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 178. Antigüedad: 9 años, 11 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-178",
        "fecha": "2016-10-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 179,
    "nroMovil": "179",
    "nombres": "JUAN GABRIEL",
    "apPaterno": "HOYOS",
    "apMaterno": "OLGUIN",
    "ci": "S/C-179",
    "celular": "",
    "fechaIngreso": "2020-06-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 179. Antigüedad: 6 años, 3 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-179",
        "fecha": "2020-06-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 180,
    "nroMovil": "180",
    "nombres": "MARIO",
    "apPaterno": "CUENCA",
    "apMaterno": "GAITE",
    "ci": "S/C-180",
    "celular": "",
    "fechaIngreso": "2015-10-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 180. Antigüedad: 10 años, 11 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-180",
        "fecha": "2015-10-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 181,
    "nroMovil": "181",
    "nombres": "TOMAS",
    "apPaterno": "GARCIA",
    "apMaterno": "JAVIER",
    "ci": "S/C-181",
    "celular": "",
    "fechaIngreso": "2016-12-03",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 181. Antigüedad: 9 años, 9 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-181",
        "fecha": "2016-12-03",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 184,
    "nroMovil": "184",
    "nombres": "AXEL YAMIL",
    "apPaterno": "MENDEZ",
    "apMaterno": "BATALLANOS",
    "ci": "S/C-184",
    "celular": "",
    "fechaIngreso": "2022-10-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 184. Antigüedad: 3 años, 11 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-184",
        "fecha": "2022-10-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 185,
    "nroMovil": "185",
    "nombres": "CARLOS ALBERTO",
    "apPaterno": "ARROYO",
    "apMaterno": "",
    "ci": "S/C-185",
    "celular": "",
    "fechaIngreso": "2012-08-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 185. Antigüedad: 14 años, 1 mes (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-185",
        "fecha": "2012-08-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 186,
    "nroMovil": "186",
    "nombres": "EUDALIA",
    "apPaterno": "DONAIRE",
    "apMaterno": "MARCADO",
    "ci": "S/C-186",
    "celular": "",
    "fechaIngreso": "2013-07-04",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 186. Antigüedad: 13 años, 2 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-186",
        "fecha": "2013-07-04",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 187,
    "nroMovil": "187",
    "nombres": "CAROLINA",
    "apPaterno": "BARCA",
    "apMaterno": "NOLASKO",
    "ci": "S/C-187",
    "celular": "",
    "fechaIngreso": "2015-11-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 187. Antigüedad: 10 años, 10 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-187",
        "fecha": "2015-11-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 188,
    "nroMovil": "188",
    "nombres": "REINALDO",
    "apPaterno": "DURAN",
    "apMaterno": "CAHUAYA",
    "ci": "S/C-188",
    "celular": "",
    "fechaIngreso": "2019-12-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 188. Antigüedad: 6 años, 9 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-188",
        "fecha": "2019-12-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 189,
    "nroMovil": "189",
    "nombres": "ARMANDO FAUSTO",
    "apPaterno": "AGUILAR",
    "apMaterno": "ALCALA",
    "ci": "S/C-189",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 189. Antigüedad: 14 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-189",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 190,
    "nroMovil": "190",
    "nombres": "JHONNY MARCELO",
    "apPaterno": "DELGADO",
    "apMaterno": "MURIEL",
    "ci": "S/C-190",
    "celular": "",
    "fechaIngreso": "2025-07-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 190. Antigüedad: 1 año, 2 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-190",
        "fecha": "2025-07-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 191,
    "nroMovil": "191",
    "nombres": "FREDDY ALEJANDRO",
    "apPaterno": "ALCON",
    "apMaterno": "GARNICA",
    "ci": "S/C-191",
    "celular": "",
    "fechaIngreso": "2023-08-04",
    "estado": "BAJA",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 191. Antigüedad: 3 años, 1 mes (Est. Acc: Retirado).",
    "acciones": [
      {
        "id": "ACC-191",
        "fecha": "2023-08-04",
        "monto": 0.0,
        "estado": "BAJA",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 192,
    "nroMovil": "192",
    "nombres": "NORMA",
    "apPaterno": "RIVERA",
    "apMaterno": "ARAMAYO",
    "ci": "S/C-192",
    "celular": "",
    "fechaIngreso": "2026-05-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 192. Antigüedad: 4 meses, 2 días (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-192",
        "fecha": "2026-05-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 194,
    "nroMovil": "194",
    "nombres": "SIMAR",
    "apPaterno": "DIAZ",
    "apMaterno": "MIRAVAL",
    "ci": "S/C-194",
    "celular": "",
    "fechaIngreso": "2016-06-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 194. Antigüedad: 10 años, 3 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-194",
        "fecha": "2016-06-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 195,
    "nroMovil": "195",
    "nombres": "FRANZ MARCELO",
    "apPaterno": "MERCADO",
    "apMaterno": "",
    "ci": "S/C-195",
    "celular": "",
    "fechaIngreso": "2015-10-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 195. Antigüedad: 10 años, 11 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-195",
        "fecha": "2015-10-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 196,
    "nroMovil": "196",
    "nombres": "VLADIMIR FERNANDO",
    "apPaterno": "LOPEZ",
    "apMaterno": "RODRIGUEZ",
    "ci": "S/C-196",
    "celular": "",
    "fechaIngreso": "2014-03-05",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 196. Antigüedad: 12 años, 6 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-196",
        "fecha": "2014-03-05",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 198,
    "nroMovil": "198",
    "nombres": "DANIEL GUSTAVO",
    "apPaterno": "GIRA",
    "apMaterno": "HOYOS",
    "ci": "S/C-198",
    "celular": "",
    "fechaIngreso": "2018-03-05",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 198. Antigüedad: 8 años, 6 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-198",
        "fecha": "2018-03-05",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 199,
    "nroMovil": "199",
    "nombres": "TERESA BARBARITA",
    "apPaterno": "CAMACHO",
    "apMaterno": "CASTILLO",
    "ci": "S/C-199",
    "celular": "",
    "fechaIngreso": "2025-07-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 199. Antigüedad: 1 año, 2 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-199",
        "fecha": "2025-07-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 200,
    "nroMovil": "200",
    "nombres": "FELIX",
    "apPaterno": "VELASQUEZ",
    "apMaterno": "FLORES",
    "ci": "S/C-200",
    "celular": "",
    "fechaIngreso": "2019-01-03",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 200. Antigüedad: 7 años, 8 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-200",
        "fecha": "2019-01-03",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 202,
    "nroMovil": "202",
    "nombres": "CARLOS RAMIRO",
    "apPaterno": "VILLAFUERTE",
    "apMaterno": "GALEAN",
    "ci": "S/C-202",
    "celular": "",
    "fechaIngreso": "2019-05-05",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 202. Antigüedad: 7 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-202",
        "fecha": "2019-05-05",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 203,
    "nroMovil": "203",
    "nombres": "JONAS",
    "apPaterno": "DIAZ",
    "apMaterno": "LOPEZ",
    "ci": "S/C-203",
    "celular": "",
    "fechaIngreso": "2024-07-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 203. Antigüedad: 2 años, 2 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-203",
        "fecha": "2024-07-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 204,
    "nroMovil": "204",
    "nombres": "ELVIS YONATAN",
    "apPaterno": "LOPEZ",
    "apMaterno": "LOPEZ",
    "ci": "S/C-204",
    "celular": "",
    "fechaIngreso": "2022-12-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 204. Antigüedad: 3 años, 9 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-204",
        "fecha": "2022-12-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 205,
    "nroMovil": "205",
    "nombres": "WILFREDO CEFERINO",
    "apPaterno": "BALDIVIEZO",
    "apMaterno": "ZENTENO",
    "ci": "S/C-205",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 205. Antigüedad: 14 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-205",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 206,
    "nroMovil": "206",
    "nombres": "LUIS",
    "apPaterno": "MORALES",
    "apMaterno": "AIRA",
    "ci": "S/C-206",
    "celular": "",
    "fechaIngreso": "2023-02-03",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 206. Antigüedad: 3 años, 7 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-206",
        "fecha": "2023-02-03",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 207,
    "nroMovil": "207",
    "nombres": "CIMAR RAMIRO",
    "apPaterno": "MIRANDA",
    "apMaterno": "LOPEZ",
    "ci": "S/C-207",
    "celular": "",
    "fechaIngreso": "2012-05-04",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 207. Antigüedad: 14 años, 4 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-207",
        "fecha": "2012-05-04",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 208,
    "nroMovil": "208",
    "nombres": "LIDIA",
    "apPaterno": "FIGUEROA",
    "apMaterno": "FERNANDEZ",
    "ci": "S/C-208",
    "celular": "",
    "fechaIngreso": "2014-07-05",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 208. Antigüedad: 12 años, 2 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-208",
        "fecha": "2014-07-05",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 209,
    "nroMovil": "209",
    "nombres": "ROY MAYKOL",
    "apPaterno": "ORDOÑEZ",
    "apMaterno": "ARCE",
    "ci": "S/C-209",
    "celular": "",
    "fechaIngreso": "2022-07-05",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 209. Antigüedad: 4 años, 2 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-209",
        "fecha": "2022-07-05",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 210,
    "nroMovil": "210",
    "nombres": "FERNANDO DANIEL",
    "apPaterno": "FLORES",
    "apMaterno": "LOPEZ",
    "ci": "S/C-210",
    "celular": "",
    "fechaIngreso": "2016-10-03",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 210. Antigüedad: 9 años, 11 meses (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-210",
        "fecha": "2016-10-03",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 211,
    "nroMovil": "211",
    "nombres": "JOSE MANUEL",
    "apPaterno": "CRUZ",
    "apMaterno": "CKACKA",
    "ci": "S/C-211",
    "celular": "",
    "fechaIngreso": "2024-05-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 211. Antigüedad: 2 años, 4 meses (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-211",
        "fecha": "2024-05-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 275,
    "nroMovil": "275",
    "nombres": "JAVIER RODRIGO",
    "apPaterno": "ORDOÑEZ",
    "apMaterno": "CASTRO",
    "ci": "S/C-275",
    "celular": "",
    "fechaIngreso": "2025-12-08",
    "estado": "SUSP",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 275. Antigüedad: 8 meses, 26 días (Est. Acc: Inhabilitado).",
    "acciones": [
      {
        "id": "ACC-275",
        "fecha": "2025-12-08",
        "monto": 0.0,
        "estado": "SUSP",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 298,
    "nroMovil": "298",
    "nombres": "RONALD HERNAN",
    "apPaterno": "GUTIERREZ",
    "apMaterno": "SALINAS",
    "ci": "S/C-298",
    "celular": "",
    "fechaIngreso": "2026-05-03",
    "estado": "BAJA",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 298. Antigüedad: 4 meses, 2 días (Est. Acc: Retirado).",
    "acciones": [
      {
        "id": "ACC-298",
        "fecha": "2026-05-03",
        "monto": 0.0,
        "estado": "BAJA",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 500,
    "nroMovil": "500",
    "nombres": "LUISA MARIELA",
    "apPaterno": "CASTRO",
    "apMaterno": "MIRANDA",
    "ci": "S/C-500",
    "celular": "",
    "fechaIngreso": "2025-08-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 500. Antigüedad: 1 año, 1 mes (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-500",
        "fecha": "2025-08-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 522,
    "nroMovil": "522",
    "nombres": "JOSE MANUEL",
    "apPaterno": "ACEBEY",
    "apMaterno": "ARMELLA",
    "ci": "S/C-522",
    "celular": "",
    "fechaIngreso": "2025-08-04",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 522. Antigüedad: 1 año, 1 mes (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-522",
        "fecha": "2025-08-04",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 601,
    "nroMovil": "601",
    "nombres": "AGUSTÍN",
    "apPaterno": "LOZANO",
    "apMaterno": "VILTE",
    "ci": "S/C-601",
    "celular": "",
    "fechaIngreso": "2025-11-23",
    "estado": "VIG",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 601. Antigüedad: 9 meses, 11 días (Est. Acc: VIG).",
    "acciones": [
      {
        "id": "ACC-601",
        "fecha": "2025-11-23",
        "monto": 0.0,
        "estado": "VIG",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  },
  {
    "id": 999,
    "nroMovil": "999",
    "nombres": "RODRIGO",
    "apPaterno": "VILLA",
    "apMaterno": "",
    "ci": "S/C-999",
    "celular": "",
    "fechaIngreso": "2026-04-24",
    "estado": "BAJA",
    "categoria": "Propietario",
    "observaciones": "Móvil N° 999. Antigüedad: 4 meses, 11 días (Est. Acc: Retirado).",
    "acciones": [
      {
        "id": "ACC-999",
        "fecha": "2026-04-24",
        "monto": 0.0,
        "estado": "BAJA",
        "categoria": "Propietario"
      }
    ],
    "obligaciones": [
      {
        "nombre": "Sostenimiento",
        "monto": 400.0,
        "periodicidad": "Mensual"
      },
      {
        "nombre": "Mantenimiento GPS",
        "monto": 80.0,
        "periodicidad": "Mensual"
      }
    ]
  }
];

// Cuentas por Cobrar y Obligaciones en Cero
export const INITIAL_DEUDAS = [
  {
    "id": "d-202609-0",
    "dbId": 1,
    "socioId": 0,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #00",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-1",
    "dbId": 2,
    "socioId": 1,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #01",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-2",
    "dbId": 3,
    "socioId": 2,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #02",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-3",
    "dbId": 4,
    "socioId": 3,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #03",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-4",
    "dbId": 5,
    "socioId": 4,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #04",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-5",
    "dbId": 6,
    "socioId": 5,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #05",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-6",
    "dbId": 7,
    "socioId": 6,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #06",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-7",
    "dbId": 8,
    "socioId": 7,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #07",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-8",
    "dbId": 9,
    "socioId": 8,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #08",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-9",
    "dbId": 10,
    "socioId": 9,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #09",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-10",
    "dbId": 11,
    "socioId": 10,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #10",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-11",
    "dbId": 12,
    "socioId": 11,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #11",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-13",
    "dbId": 13,
    "socioId": 13,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #13",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-14",
    "dbId": 14,
    "socioId": 14,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #14",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-15",
    "dbId": 15,
    "socioId": 15,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #15",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-16",
    "dbId": 16,
    "socioId": 16,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #16",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-17",
    "dbId": 17,
    "socioId": 17,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #17",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-18",
    "dbId": 18,
    "socioId": 18,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #18",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-19",
    "dbId": 19,
    "socioId": 19,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #19",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-20",
    "dbId": 20,
    "socioId": 20,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #20",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-21",
    "dbId": 21,
    "socioId": 21,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #21",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-22",
    "dbId": 22,
    "socioId": 22,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #22",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-23",
    "dbId": 23,
    "socioId": 23,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #23",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-24",
    "dbId": 24,
    "socioId": 24,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #24",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-25",
    "dbId": 25,
    "socioId": 25,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #25",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-26",
    "dbId": 26,
    "socioId": 26,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #26",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-27",
    "dbId": 27,
    "socioId": 27,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #27",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-28",
    "dbId": 28,
    "socioId": 28,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #28",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-29",
    "dbId": 29,
    "socioId": 29,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #29",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-30",
    "dbId": 30,
    "socioId": 30,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #30",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-31",
    "dbId": 31,
    "socioId": 31,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #31",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-32",
    "dbId": 32,
    "socioId": 32,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #32",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-33",
    "dbId": 33,
    "socioId": 33,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #33",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-34",
    "dbId": 34,
    "socioId": 34,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #34",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-35",
    "dbId": 35,
    "socioId": 35,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #35",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-36",
    "dbId": 36,
    "socioId": 36,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #36",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-37",
    "dbId": 37,
    "socioId": 37,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #37",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-38",
    "dbId": 38,
    "socioId": 38,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #38",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-39",
    "dbId": 39,
    "socioId": 39,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #39",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-40",
    "dbId": 40,
    "socioId": 40,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #40",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-41",
    "dbId": 41,
    "socioId": 41,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #41",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-42",
    "dbId": 42,
    "socioId": 42,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #42",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-43",
    "dbId": 43,
    "socioId": 43,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #43",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-44",
    "dbId": 44,
    "socioId": 44,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #44",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-45",
    "dbId": 45,
    "socioId": 45,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #45",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-46",
    "dbId": 46,
    "socioId": 46,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #46",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-47",
    "dbId": 47,
    "socioId": 47,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #47",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-48",
    "dbId": 48,
    "socioId": 48,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #48",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-49",
    "dbId": 49,
    "socioId": 49,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #49",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-50",
    "dbId": 50,
    "socioId": 50,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #50",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-51",
    "dbId": 51,
    "socioId": 51,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #51",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-52",
    "dbId": 52,
    "socioId": 52,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #52",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-53",
    "dbId": 53,
    "socioId": 53,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #53",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-54",
    "dbId": 54,
    "socioId": 54,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #54",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-55",
    "dbId": 55,
    "socioId": 55,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #55",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-56",
    "dbId": 56,
    "socioId": 56,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #56",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-57",
    "dbId": 57,
    "socioId": 57,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #57",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-58",
    "dbId": 58,
    "socioId": 58,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #58",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-59",
    "dbId": 59,
    "socioId": 59,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #59",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-60",
    "dbId": 60,
    "socioId": 60,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #60",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-61",
    "dbId": 61,
    "socioId": 61,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #61",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-62",
    "dbId": 62,
    "socioId": 62,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #62",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-63",
    "dbId": 63,
    "socioId": 63,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #63",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-64",
    "dbId": 64,
    "socioId": 64,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #64",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-66",
    "dbId": 65,
    "socioId": 66,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #66",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-67",
    "dbId": 66,
    "socioId": 67,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #67",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-68",
    "dbId": 67,
    "socioId": 68,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #68",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-69",
    "dbId": 68,
    "socioId": 69,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #69",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-70",
    "dbId": 69,
    "socioId": 70,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #70",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-71",
    "dbId": 70,
    "socioId": 71,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #71",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-72",
    "dbId": 71,
    "socioId": 72,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #72",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-73",
    "dbId": 72,
    "socioId": 73,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #73",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-74",
    "dbId": 73,
    "socioId": 74,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #74",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-75",
    "dbId": 74,
    "socioId": 75,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #75",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-76",
    "dbId": 75,
    "socioId": 76,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #76",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-77",
    "dbId": 76,
    "socioId": 77,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #77",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-78",
    "dbId": 77,
    "socioId": 78,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #78",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-79",
    "dbId": 78,
    "socioId": 79,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #79",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-80",
    "dbId": 79,
    "socioId": 80,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #80",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-81",
    "dbId": 80,
    "socioId": 81,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #81",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-82",
    "dbId": 81,
    "socioId": 82,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #82",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-83",
    "dbId": 82,
    "socioId": 83,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #83",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-84",
    "dbId": 83,
    "socioId": 84,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #84",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-85",
    "dbId": 84,
    "socioId": 85,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #85",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-86",
    "dbId": 85,
    "socioId": 86,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #86",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-87",
    "dbId": 86,
    "socioId": 87,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #87",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-88",
    "dbId": 87,
    "socioId": 88,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #88",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-89",
    "dbId": 88,
    "socioId": 89,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #89",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-90",
    "dbId": 89,
    "socioId": 90,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #90",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-91",
    "dbId": 90,
    "socioId": 91,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #91",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-92",
    "dbId": 91,
    "socioId": 92,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #92",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-93",
    "dbId": 92,
    "socioId": 93,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #93",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-94",
    "dbId": 93,
    "socioId": 94,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #94",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-95",
    "dbId": 94,
    "socioId": 95,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #95",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-96",
    "dbId": 95,
    "socioId": 96,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #96",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-97",
    "dbId": 96,
    "socioId": 97,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #97",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-98",
    "dbId": 97,
    "socioId": 98,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #98",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-99",
    "dbId": 98,
    "socioId": 99,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #99",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-100",
    "dbId": 99,
    "socioId": 100,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #100",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-101",
    "dbId": 100,
    "socioId": 101,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #101",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-102",
    "dbId": 101,
    "socioId": 102,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #102",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-103",
    "dbId": 102,
    "socioId": 103,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #103",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-104",
    "dbId": 103,
    "socioId": 104,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #104",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-105",
    "dbId": 104,
    "socioId": 105,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #105",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-106",
    "dbId": 105,
    "socioId": 106,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #106",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-107",
    "dbId": 106,
    "socioId": 107,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #107",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-108",
    "dbId": 107,
    "socioId": 108,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #108",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-109",
    "dbId": 108,
    "socioId": 109,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #109",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-110",
    "dbId": 109,
    "socioId": 110,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #110",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-111",
    "dbId": 110,
    "socioId": 111,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #111",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-113",
    "dbId": 111,
    "socioId": 113,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #113",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-114",
    "dbId": 112,
    "socioId": 114,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #114",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-115",
    "dbId": 113,
    "socioId": 115,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #115",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-116",
    "dbId": 114,
    "socioId": 116,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #116",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-117",
    "dbId": 115,
    "socioId": 117,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #117",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-118",
    "dbId": 116,
    "socioId": 118,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #118",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-119",
    "dbId": 117,
    "socioId": 119,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #119",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-120",
    "dbId": 118,
    "socioId": 120,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #120",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-121",
    "dbId": 119,
    "socioId": 121,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #121",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-122",
    "dbId": 120,
    "socioId": 122,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #122",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-123",
    "dbId": 121,
    "socioId": 123,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #123",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-124",
    "dbId": 122,
    "socioId": 124,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #124",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-125",
    "dbId": 123,
    "socioId": 125,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #125",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-126",
    "dbId": 124,
    "socioId": 126,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #126",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-127",
    "dbId": 125,
    "socioId": 127,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #127",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-128",
    "dbId": 126,
    "socioId": 128,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #128",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-129",
    "dbId": 127,
    "socioId": 129,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #129",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-130",
    "dbId": 128,
    "socioId": 130,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #130",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-131",
    "dbId": 129,
    "socioId": 131,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #131",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-132",
    "dbId": 130,
    "socioId": 132,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #132",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-133",
    "dbId": 131,
    "socioId": 133,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #133",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-134",
    "dbId": 132,
    "socioId": 134,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #134",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-135",
    "dbId": 133,
    "socioId": 135,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #135",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-136",
    "dbId": 134,
    "socioId": 136,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #136",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-137",
    "dbId": 135,
    "socioId": 137,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #137",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-138",
    "dbId": 136,
    "socioId": 138,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #138",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-139",
    "dbId": 137,
    "socioId": 139,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #139",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-140",
    "dbId": 138,
    "socioId": 140,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #140",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-141",
    "dbId": 139,
    "socioId": 141,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #141",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-142",
    "dbId": 140,
    "socioId": 142,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #142",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-143",
    "dbId": 141,
    "socioId": 143,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #143",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-144",
    "dbId": 142,
    "socioId": 144,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #144",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-145",
    "dbId": 143,
    "socioId": 145,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #145",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-147",
    "dbId": 144,
    "socioId": 147,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #147",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-148",
    "dbId": 145,
    "socioId": 148,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #148",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-149",
    "dbId": 146,
    "socioId": 149,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #149",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-150",
    "dbId": 147,
    "socioId": 150,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #150",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-151",
    "dbId": 148,
    "socioId": 151,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #151",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-152",
    "dbId": 149,
    "socioId": 152,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #152",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-153",
    "dbId": 150,
    "socioId": 153,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #153",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-154",
    "dbId": 151,
    "socioId": 154,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #154",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-155",
    "dbId": 152,
    "socioId": 155,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #155",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-156",
    "dbId": 153,
    "socioId": 156,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #156",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-158",
    "dbId": 154,
    "socioId": 158,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #158",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-159",
    "dbId": 155,
    "socioId": 159,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #159",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-160",
    "dbId": 156,
    "socioId": 160,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #160",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-161",
    "dbId": 157,
    "socioId": 161,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #161",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-163",
    "dbId": 158,
    "socioId": 163,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #163",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-164",
    "dbId": 159,
    "socioId": 164,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #164",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-165",
    "dbId": 160,
    "socioId": 165,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #165",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-166",
    "dbId": 161,
    "socioId": 166,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #166",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-168",
    "dbId": 162,
    "socioId": 168,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #168",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-169",
    "dbId": 163,
    "socioId": 169,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #169",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-170",
    "dbId": 164,
    "socioId": 170,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #170",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-171",
    "dbId": 165,
    "socioId": 171,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #171",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-172",
    "dbId": 166,
    "socioId": 172,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #172",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-173",
    "dbId": 167,
    "socioId": 173,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #173",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-174",
    "dbId": 168,
    "socioId": 174,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #174",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-175",
    "dbId": 169,
    "socioId": 175,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #175",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-176",
    "dbId": 170,
    "socioId": 176,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #176",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-177",
    "dbId": 171,
    "socioId": 177,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #177",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-178",
    "dbId": 172,
    "socioId": 178,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #178",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-179",
    "dbId": 173,
    "socioId": 179,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #179",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-180",
    "dbId": 174,
    "socioId": 180,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #180",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-181",
    "dbId": 175,
    "socioId": 181,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #181",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-184",
    "dbId": 176,
    "socioId": 184,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #184",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-185",
    "dbId": 177,
    "socioId": 185,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #185",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-186",
    "dbId": 178,
    "socioId": 186,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #186",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-187",
    "dbId": 179,
    "socioId": 187,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #187",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-188",
    "dbId": 180,
    "socioId": 188,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #188",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-189",
    "dbId": 181,
    "socioId": 189,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #189",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-190",
    "dbId": 182,
    "socioId": 190,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #190",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-191",
    "dbId": 183,
    "socioId": 191,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #191",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-192",
    "dbId": 184,
    "socioId": 192,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #192",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-194",
    "dbId": 185,
    "socioId": 194,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #194",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-195",
    "dbId": 186,
    "socioId": 195,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #195",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-196",
    "dbId": 187,
    "socioId": 196,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #196",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-198",
    "dbId": 188,
    "socioId": 198,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #198",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-199",
    "dbId": 189,
    "socioId": 199,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #199",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-200",
    "dbId": 190,
    "socioId": 200,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #200",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-202",
    "dbId": 191,
    "socioId": 202,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #202",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-203",
    "dbId": 192,
    "socioId": 203,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #203",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-204",
    "dbId": 193,
    "socioId": 204,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #204",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-205",
    "dbId": 194,
    "socioId": 205,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #205",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-206",
    "dbId": 195,
    "socioId": 206,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #206",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-207",
    "dbId": 196,
    "socioId": 207,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #207",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-208",
    "dbId": 197,
    "socioId": 208,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #208",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-209",
    "dbId": 198,
    "socioId": 209,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #209",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-210",
    "dbId": 199,
    "socioId": 210,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #210",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-211",
    "dbId": 200,
    "socioId": 211,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #211",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-275",
    "dbId": 201,
    "socioId": 275,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #275",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-298",
    "dbId": 202,
    "socioId": 298,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #298",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-500",
    "dbId": 203,
    "socioId": 500,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #500",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-522",
    "dbId": 204,
    "socioId": 522,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #522",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-601",
    "dbId": 205,
    "socioId": 601,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #601",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  },
  {
    "id": "d-202609-999",
    "dbId": 206,
    "socioId": 999,
    "conceptoId": 1,
    "descripcion": "Cuota Frecuencia Mensual (Septiembre 2026) - Móvil #999",
    "monto": 200.0,
    "pagado": false,
    "periodo": "Septiembre 2026",
    "fecha": "2026-09-01",
    "fechaVencimiento": "2026-09-30",
    "moneda": "Bs",
    "cantidad": 1,
    "cajaId": "c1"
  }
];

// 5 Cajas Oficiales de Recaudación y Operación - Radio Móvil 15 de Abril
export const INITIAL_CAJAS = [
  { 
    id: "c1", 
    nombre: "CAJA DE FRECUENCIA", 
    saldoAnterior: 0.00, 
    ingresos: 0.00, 
    egresos: 0.00, 
    saldoActual: 0.00,
    descripcion: "Cuotas ordinarias de frecuencia y sostenimiento de socios"
  },
  { 
    id: "c2", 
    nombre: "CAJA DE MULTAS E INFRACCIONES", 
    saldoAnterior: 0.00, 
    ingresos: 0.00, 
    egresos: 0.00, 
    saldoActual: 0.00,
    descripcion: "Sanciones por inasistencias a asambleas, reuniones y marchas"
  },
  { 
    id: "c3", 
    nombre: "CAJA NUEVOS SOCIOS", 
    saldoAnterior: 0.00, 
    ingresos: 0.00, 
    egresos: 0.00, 
    saldoActual: 0.00,
    descripcion: "Inscripciones, cuotas de ingreso y aportes de nuevos afiliados"
  },
  { 
    id: "c4", 
    nombre: "CAJA PRÉSTAMOS", 
    saldoAnterior: 0.00, 
    ingresos: 0.00, 
    egresos: 0.00, 
    saldoActual: 0.00,
    descripcion: "Fondo rotatorio de créditos internos y cobro de amortizaciones"
  },
  { 
    id: "c5", 
    nombre: "CAJA FRECUENCIA INQUILINOS", 
    saldoAnterior: 0.00, 
    ingresos: 0.00, 
    egresos: 0.00, 
    saldoActual: 0.00,
    descripcion: "Aportes y uso de frecuencia para conductores inquilinos y relevos"
  }
];

// Egresos y Comprobantes en Cero
export const INITIAL_EGRESOS = [];

// Cartera de Préstamos en Cero (Producción Limpia)
export const INITIAL_PRESTAMOS = [];

// Historial de Recibos en Cero (Producción Limpia)
export const INITIAL_RECIBOS = [];

// Inventario de Almacén en Cero
export const INITIAL_PRODUCTOS = [];

// Módulos del Sistema para Control de Acceso (RBAC)
export const ALL_SYSTEM_MODULES = [
  { id: 'dashboard', label: 'Dashboard General', descripcion: 'Métricas, KPIs y alertas en tiempo real' },
  { id: 'socios', label: 'Padrón de Socios', descripcion: 'Gestión de afiliados, vehículos y credenciales' },
  { id: 'cuotas', label: 'Cuotas y Multas', descripcion: 'Configuración y asignación de cargos económicos' },
  { id: 'cobranzas', label: 'Caja Rápida / Cobranzas', descripcion: 'Ventanilla de cobros, recibos y reimpresión' },
  { id: 'egresos', label: 'Control de Egresos', descripcion: 'Emisión de boletas y pagos institucionales' },
  { id: 'prestamos', label: 'Gestión de Préstamos', descripcion: 'Créditos internos y cronogramas de amortización' },
  { id: 'workflow', label: 'Workflow Cierre de Caja', descripcion: 'Arqueo diario y balance de entrega de turno' },
  { id: 'balance', label: 'Balance por Cajas', descripcion: 'Estados de cuentas de cajas múltiples' },
  { id: 'almacen', label: 'Almacén y Repuestos', descripcion: 'Control de inventario, compras y kardex' },
  { id: 'reportes', label: 'Matriz de Reportes', descripcion: 'Exportación a Excel y nóminas oficiales' },
  { id: 'conciliacion', label: 'Conciliación Bancaria', descripcion: 'Importación de extractos y cuadre' },
  { id: 'auditoria', label: 'Bitácora de Auditoría', descripcion: 'Trazabilidad de operaciones de usuarios' },
  { id: 'ficha', label: 'Ficha Técnica del Sistema', descripcion: 'Documentación técnica de la plataforma' },
  { id: 'config', label: 'Configuración del Sistema', descripcion: 'Parámetros generales, tipo de cambio e insumos' },
  { id: 'usuarios', label: 'Usuarios y Roles', descripcion: 'Creación de operadores y asignación de permisos RBAC' }
];

// Perfiles de Roles del Sistema
export const INITIAL_ROLES = [
  {
    id: 'admin',
    nombre: 'Super Administrador / Directorio',
    descripcion: 'Acceso irrestricto a todos los módulos y operaciones del sistema.',
    color: 'red',
    modulos: ['dashboard', 'socios', 'cuotas', 'cobranzas', 'egresos', 'prestamos', 'workflow', 'balance', 'almacen', 'reportes', 'conciliacion', 'auditoria', 'ficha', 'config', 'usuarios'],
    permisos: { ver: true, crear: true, editar: true, anular: true, exportar: true }
  },
  {
    id: 'cajero',
    nombre: 'Cajero(a) de Ventanilla',
    descripcion: 'Cobranza en caja rápida, consulta de socios y arqueo de turno.',
    color: 'blue',
    modulos: ['dashboard', 'socios', 'cuotas', 'cobranzas', 'workflow'],
    permisos: { ver: true, crear: true, editar: false, anular: false, exportar: true }
  },
  {
    id: 'hacienda',
    nombre: 'Secretaría de Hacienda / Tesorería',
    descripcion: 'Control de egresos, balances, préstamos y estados financieros.',
    color: 'emerald',
    modulos: ['dashboard', 'socios', 'cuotas', 'cobranzas', 'egresos', 'prestamos', 'workflow', 'balance', 'reportes', 'conciliacion', 'auditoria'],
    permisos: { ver: true, crear: true, editar: true, anular: true, exportar: true }
  },
  {
    id: 'operador',
    nombre: 'Operador de Turno y Radio',
    descripcion: 'Padrón de afiliados, asignación de turnos y aplicación de multas.',
    color: 'amber',
    modulos: ['dashboard', 'socios', 'cuotas'],
    permisos: { ver: true, crear: true, editar: false, anular: false, exportar: true }
  },
  {
    id: 'auditor',
    nombre: 'Auditor / Fiscalizador',
    descripcion: 'Modo de supervisión y solo lectura en balances, reportes y bitácora.',
    color: 'purple',
    modulos: ['dashboard', 'balance', 'reportes', 'auditoria', 'ficha'],
    permisos: { ver: true, crear: false, editar: false, anular: false, exportar: true }
  }
];

// Usuario Administrador Central de Arranque
export const INITIAL_USERS = [
  {
    id: 'u1',
    usuario: 'admin33',
    password: '123',
    nombreCompleto: 'Administrador Central (SISCOB)',
    email: 'admin@radiomovil15deabril.com',
    celular: '7141199',
    rolId: 'admin',
    estado: 'ACTIVO',
    fechaCreacion: '2026-09-01',
    ultimoAcceso: '03/09/2026'
  }
];