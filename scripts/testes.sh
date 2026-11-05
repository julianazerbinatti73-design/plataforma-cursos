
#!/bin/bash

URL="http://localhost:3018"
LOG="resultado_execucao.log"
RESPOSTA="/tmp/resposta_api.json"

TOTAL=0
APROVADOS=0
REPROVADOS=0

echo "==========================================" > "$LOG"
echo " TESTES AUTOMATIZADOS - PLATAFORMA CURSOS" >> "$LOG"
echo " Data: $(date)" >> "$LOG"
echo "==========================================" >> "$LOG"

requisicao() {
    METODO="$1"
    ENDPOINT="$2"
    DADOS="$3"

    if [ -n "$DADOS" ]; then
        STATUS=$(curl -s -o "$RESPOSTA" -w "%{http_code}" \
            -X "$METODO" "$URL$ENDPOINT" \
            -H "Content-Type: application/json" \
            -d "$DADOS")
    else
        STATUS=$(curl -s -o "$RESPOSTA" -w "%{http_code}" \
            -X "$METODO" "$URL$ENDPOINT")
    fi
}

verificar() {
    DESCRICAO="$1"
    ESPERADO="$2"

    TOTAL=$((TOTAL + 1))

    if [ "$STATUS" = "$ESPERADO" ]; then
        echo "[APROVADO] $DESCRICAO - HTTP $STATUS" | tee -a "$LOG"
        APROVADOS=$((APROVADOS + 1))
    else
        echo "[REPROVADO] $DESCRICAO - Esperado: $ESPERADO | Recebido: $STATUS" | tee -a "$LOG"
        REPROVADOS=$((REPROVADOS + 1))
    fi
}

echo "========== TESTES DE CURSOS ==========" | tee -a "$LOG"

requisicao POST "/api/cursos" '{
    "nome": "Desenvolvimento Web",
    "descricao": "Curso de HTML CSS e JavaScript",
    "carga_horaria": 80,
    "categoria": "Programacao",
    "instrutor": "Carlos Silva"
}'
verificar "Cadastrar curso" 201

CURSO_ID=$(jq -r '.curso.id // empty' "$RESPOSTA")

if [ -z "$CURSO_ID" ]; then
    echo "ERRO: Nao foi possivel cadastrar o curso." | tee -a "$LOG"
    exit 1
fi

requisicao GET "/api/cursos" ""
verificar "Listar cursos" 200

requisicao GET "/api/cursos/$CURSO_ID" ""
verificar "Buscar curso por ID" 200

requisicao GET "/api/cursos?categoria=Programacao" ""
verificar "Filtrar cursos por categoria" 200

requisicao GET "/api/cursos?nome=Web" ""
verificar "Pesquisar cursos por nome" 200

requisicao POST "/api/cursos" '{"nome":"Curso incompleto"}'
verificar "Validar cadastro de curso" 400

requisicao PUT "/api/cursos/$CURSO_ID" '{
    "nome": "Desenvolvimento Web Full Stack",
    "descricao": "Curso completo",
    "carga_horaria": 120,
    "categoria": "Programacao",
    "instrutor": "Carlos Silva"
}'
verificar "Atualizar curso" 200

requisicao PUT "/api/cursos/$CURSO_ID" '{"carga_horaria":-10}'
verificar "Validar atualizacao de curso" 400

echo "========== TESTES DE MATRICULAS ==========" | tee -a "$LOG"

requisicao POST "/api/matriculas" "{
    \"aluno\":\"Juliana Garrido\",
    \"email\":\"juliana@email.com\",
    \"curso_id\":$CURSO_ID
}"
verificar "Cadastrar matricula" 201

MATRICULA_ID=$(jq -r '.matricula.id // empty' "$RESPOSTA")

if [ -z "$MATRICULA_ID" ]; then
    echo "ERRO: Nao foi possivel cadastrar a matricula." | tee -a "$LOG"
    exit 1
fi

requisicao GET "/api/matriculas" ""
verificar "Listar matriculas" 200

requisicao GET "/api/matriculas/$MATRICULA_ID" ""
verificar "Buscar matricula por ID" 200

requisicao GET "/api/matriculas?aluno=Juliana" ""
verificar "Filtrar por aluno" 200

requisicao GET "/api/matriculas?curso_id=$CURSO_ID" ""
verificar "Filtrar por curso" 200

requisicao GET "/api/matriculas?status=ativa" ""
verificar "Filtrar por status" 200

requisicao POST "/api/matriculas" '{
    "aluno":"Aluno Invalido",
    "email":"emailinvalido",
    "curso_id":999
}'
verificar "Validar cadastro de matricula" 400

requisicao PUT "/api/matriculas/$MATRICULA_ID" '{"status":"concluida"}'
verificar "Atualizar matricula" 200

requisicao PUT "/api/matriculas/$MATRICULA_ID" '{"status":"invalida"}'
verificar "Validar atualizacao de matricula" 400

requisicao DELETE "/api/matriculas/$MATRICULA_ID" ""
verificar "Excluir matricula" 200

requisicao GET "/api/matriculas/$MATRICULA_ID" ""
verificar "Verificar matricula excluida" 404

echo "========== TESTES FINAIS ==========" | tee -a "$LOG"

requisicao DELETE "/api/cursos/$CURSO_ID" ""
verificar "Excluir curso" 200

requisicao GET "/api/cursos/$CURSO_ID" ""
verificar "Verificar curso excluido" 404

requisicao GET "/api/rota-inexistente" ""
verificar "Verificar rota inexistente" 404

echo "==========================================" | tee -a "$LOG"
echo "TOTAL: $TOTAL" | tee -a "$LOG"
echo "APROVADOS: $APROVADOS" | tee -a "$LOG"
echo "REPROVADOS: $REPROVADOS" | tee -a "$LOG"
echo "==========================================" | tee -a "$LOG"

rm -f "$RESPOSTA"

if [ "$REPROVADOS" -eq 0 ]; then
    echo "RESULTADO: TODOS OS TESTES APROVADOS" | tee -a "$LOG"
    exit 0
else
    echo "RESULTADO: EXISTEM FALHAS" | tee -a "$LOG"
    exit 1
fi
