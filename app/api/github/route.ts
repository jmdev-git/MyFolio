import { NextResponse } from 'next/server'

const USERNAME = 'jmdev-git'
const CURRENT_YEAR = new Date().getFullYear()

const QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalRepositoryContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              color
            }
          }
        }
      }
      repositories(first: 6, orderBy: { field: UPDATED_AT, direction: DESC }, privacy: PUBLIC) {
        nodes {
          name
          description
          stargazerCount
          forkCount
          primaryLanguage {
            name
            color
          }
          updatedAt
          url
        }
      }
    }
  }
`

export async function GET() {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return NextResponse.json({ error: 'GitHub token not configured' }, { status: 500 })
  }

  const from = `${CURRENT_YEAR}-01-01T00:00:00Z`
  const to   = `${CURRENT_YEAR}-12-31T23:59:59Z`

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { username: USERNAME, from, to },
      }),
      next: { revalidate: 3600 }, // cache for 1 hour
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'GitHub API error' }, { status: res.status })
    }

    const data = await res.json()

    if (data.errors) {
      return NextResponse.json({ error: data.errors[0].message }, { status: 400 })
    }

    const user = data.data.user
    const contributions = user.contributionsCollection

    return NextResponse.json({
      year: CURRENT_YEAR,
      totalContributions: contributions.contributionCalendar.totalContributions,
      totalCommits: contributions.totalCommitContributions,
      totalPRs: contributions.totalPullRequestContributions,
      totalIssues: contributions.totalIssueContributions,
      totalRepos: contributions.totalRepositoryContributions,
      weeks: contributions.contributionCalendar.weeks,
      repos: user.repositories.nodes,
    })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 })
  }
}
