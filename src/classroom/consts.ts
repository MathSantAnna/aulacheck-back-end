export const emailTemplate = (nmstudent: string) => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Frequência Escolar</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            background-color: #ffffff;
            margin: 50px auto;
            padding: 20px;
            max-width: 600px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
            border-bottom: 1px solid #dddddd;
        }
        .header h1 {
            margin: 0;
            color: #333333;
        }
        .content {
            padding: 20px 0;
        }
        .content p {
            font-size: 16px;
            color: #555555;
            line-height: 1.5;
            margin: 15px 0;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            border-top: 1px solid #dddddd;
            color: #888888;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Notificação de Frequência Escolar</h1>
        </div>
        <div class="content">
            <p>Prezado pai,</p>
            <p>Esperamos que esta mensagem o(a) encontre bem. Estamos entrando em contato para informar que a frequência escolar de seu filho/sua filha, ${nmstudent}, está abaixo de 80% no período recente.</p>
            <p>Estamos preocupados com o impacto que isso pode ter no desempenho acadêmico de ${nmstudent}. Acreditamos que a presença regular às aulas é essencial para o seu progresso e sucesso escolar.</p>
            <p>Solicitamos gentilmente que entre em contato conosco para discutir possíveis soluções e apoio para garantir que ${nmstudent} possa melhorar sua frequência e aproveitar ao máximo seu aprendizado.</p>
            <p>Agradecemos sua atenção e colaboração.</p>
            <p>Atenciosamente,</p>
            <p>Direção</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 AulaCheck. Todos os direitos reservados.</p>
        </div>
    </div>
</body>
</html>
`;
