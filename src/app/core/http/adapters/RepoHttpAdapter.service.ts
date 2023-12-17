import { Injectable } from '@angular/core';
import { GenericHttpAdapter } from './GenericHttpAdapter.service';

export type GithubRepo = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    repos_url: string;
    type: string;
    site_admin: boolean;
  };
}

export type QueryParams = {
  sort?: 'pushed';
  name?: 'nest';
};

@Injectable({
  providedIn: 'root'
})
export class RepoHttpAdapter {
  private readonly endpoint = 'https://api.github.com/users/godinhojoao/repos';

  constructor(private readonly httpAdapter: GenericHttpAdapter<GithubRepo>) { }

  getAllRepos(query: QueryParams): Promise<GithubRepo[]> {
    return this.httpAdapter.getAll<QueryParams>(this.endpoint, query);
  }

  // optional
  // getRepoById(id: any): Promise<GithubRepo> {
  //   return this.httpAdapter.getOne(this.endpoint, id);
  // }

  // optional
  // createRepo(repo: Omit<GithubRepo, 'id'>): Promise<GithubRepo> {
  //   return this.httpAdapter.create(this.endpoint, repo);
  // }

  // optional
  // updateRepo(id: any, repo: GithubRepo): Promise<GithubRepo> {
  //   return this.httpAdapter.update(this.endpoint, repo);
  // }

  // optional
  // deleteRepo(id: any): Promise<void> {
  //   return this.httpAdapter.delete(this.endpoint, id);
  // }
}
