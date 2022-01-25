![img](https://github.com/madeiramadeirabr/action-check-jira-issue/blob/production/img/action-check-jira-issue.svg)
# action-check-status-sd-jira

## Descrição:
Action que valida:
- Status da Issue no Jira

## Contexto de negócio:
Irá compor a estrutura padrão que está sendo desenvolvida para o CI/CD da [MadeiraMadeira](https://github.com/madeiramadeirabr 'MadeiraMadeira'), sendo aplicável a todos os Projetos Novos (e "antigos").

## Squad:
[SRE-Architecture-Carpentry](https://github.com/orgs/madeiramadeirabr/teams/squad-sre-architecture-carpentry 'SRE-Architecture-Carpentry')

## Requisitos:
1. Título da PR precisa ser validado pela action [`action-check-title-pr-pattern`](https://github.com/madeiramadeirabr/action-check-title-pr-pattern 'action-check-title-pr-pattern')
> Issue precisa ser setada entre parênteses no Título da Pull Request:
> _Exemplo:_ feat(**SRE-417**): implements Swagger.

2. A existência da Issue precisa ser validada pela action [`action-check-jira-issue`](https://github.com/madeiramadeirabr/action-check-jira-issue 'action-check-jira-issue')

3. Uso da Secret Global `GLOBALS_SRE_BASIC_AUTH_JIRA` 

## Exemplos de uso (da action):


```yml
name: CI
on:
  pull_request:
    branches:
      - production

jobs:
  check-status-sd-jira:
    runs-on: ubuntu-latest     
    outputs:
      output1: ${{ steps.title.outputs.TITLE }}
    name: 'Check the issue status in jira'
    needs: check-existence-jira-issue
    steps:
      - name: 'check status issue'
        uses: madeiramadeirabr/action-check-status-sd-jira1
        with:
          url-jira:  'https://madeiramadeira.atlassian.net/rest/api/3/issue/${{ steps.title.outputs.TITLE }}'
          basic-auth: ${{ secrets.GLOBALS_SRE_BASIC_AUTH_JIRA }}          
```