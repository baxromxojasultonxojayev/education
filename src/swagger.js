export default {
    openapi: "3.0.3", 
    info: {
      title: "Online education system API", 
      description: "Online education system API Documentation", 
      version: "1.0.0", 
      contact: {
        name: "Samandar", 
      },
    },
    // servers:["http://localhost:8080"],
    apis:["**/*Route.js"],
    paths:{
        "/users/check-phone":{
            post:{
                summary:"Check user phone number validation",
                requestBody:{
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    phone:{
                                        type:"string"
                                    }
                                },
                                example:{
                                    phone:"998935186780"
                                }
                            }
                        }
                    }
                },
                responses:{
                    '200':{
                        description:"Phone number is valid (exist)",
                    },
                    '500':{
                        description:"Internal server error"
                    }
                }
            }
        },
        "/users/signup":{
            post:{
                summary:"Register New User",
                requestBody:{
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    phone:{
                                        type:"string"
                                    },
                                    name:{
                                        type:"string"
                                    },
                                    btdate:{
                                        type:"string"
                                    },
                                    gender:{
                                        type:"number"
                                    }
                                },
                                example:{
                                    phone:"998935186781",
                                    name:"Olim",
                                    bdate:"Sat Jun 05 2021 12:46:15 GMT+0500 (Pakistan Standard Time)",
                                    gender:2
                                }
                            }
                        }
                    }
                },
                responses:{
                    '201':{
                        description:"User Created",
                    },
                    '400':{
                        description:"User did not created"
                    },
                    '500':{
                        description:"Internal server error"
                    }
                }
            }
        },
        "/users/login":{
            post:{
                summary:"Login User with sending sms to user phone number",
                requestBody:{
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    phone:{
                                        type:"string"
                                    },
                                },
                                example:{
                                    phone:"998935186780",
                                }
                            }
                        }
                    }
                },
                responses:{
                    '201':{
                        description:"Code sent to user",
                    },
                    '401':{
                        description:"Code  not sent to user"
                    },
                    '500':{
                        description:"Internal server error"
                    }
                }
            }
        },
        "/users/validate-code":{
            post:{
                summary:"Validate sent code to user",
                parameters:[{
                    "in":"header",
                    required:true,
                    name:"code-Validation-Id",
                    value:"92bd06bb-0996-4976-acc8-ff9e26c1990d",
                    schema:{
                        type:"string",
                    }
                }],
                requestBody:{
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    code:{
                                        type:"string"
                                    },
                                },
                                example:{
                                    code:"208547",
                                }
                            }
                        }
                    }
                },
                responses:{
                    '201':{
                        description:"Code is valid",
                    },
                    '401':{
                        description:"Code is invalid"
                    },
                    '500':{
                        description:"Internal server error"
                    }
                }
            },
            
        },
        "/users/edit":{
            securityDefinitions: {
                JWT: {
                    type: 'apiKey',
                    description: 'JWT authorization of an API',
                    name: 'Authorization',
                    in: 'header',
                },
            },
            parameters:[{
                name:"Authorization",
                "in":"header",
                required:true,
                value:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDMxNDJmLTEzMDUtNGRhMy1hNTQxLWM1MTEwYjVjZGFhYSIsImlhdCI6MTYyMjkwMTk2M30.AVtHi1NttVEQhMPQw8r_XePFGSuleIdqEtjnbnpaF_g",
                schema:{
                    type:"string",
                }
            }],
            post:{
                summary:"Edit User Personal Data",
                requestBody:{
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    phone:{
                                        type:"string"
                                    },
                                },
                                example:{
                                    name:"SamandarKarimov",
                                    gender:2,
                                    bdate:"Thu Jan 01 1970 05:16:40 GMT+0500 (Pakistan Standard Time)"
                                }
                            }
                        }
                    }
                },
                responses:{
                    '202':{
                        description:"User Personale Data edited",
                    },
                    '400':{
                        description:"User Personal Data did not edited"
                    },
                    '500':{
                        description:"Internal server error"
                    }
                }
            },
            
        },
        "/users":{
            get:{
                summary:"Edit User Personal Data",
                parameters:[{
                    "in":"header",
                    required:true,
                    name:"Authorization",
                    value:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDMxNDJmLTEzMDUtNGRhMy1hNTQxLWM1MTEwYjVjZGFhYSIsImlhdCI6MTYyMjg1NTgwNX0.lyj6SvyBlpdZ2OrJN1GInnXsRRXhZty2Rj1xoT_2nwI",
                    schema:{
                        type:"string",
                    }
                }],
                responses:{
                    '202':{
                        description:"User Personale Data edited",
                    },
                    '400':{
                        description:"User Personal Data did not edited"
                    },
                    '500':{
                        description:"Internal server error"
                    }
                }
            },
            
        }
    }
}