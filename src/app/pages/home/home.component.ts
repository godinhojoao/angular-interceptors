import { Component, OnInit } from '@angular/core';
import { GithubRepo, QueryParams, RepoHttpAdapter } from 'src/app/core/http/adapters/RepoHttpAdapter.service';
import { GlobalLoadingService } from 'src/app/core/services/GlobalLoadingService/GlobalLoadingService.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public repos: GithubRepo[] = [];
  public loading$ = this.globalLoadingService.loading$;
  public errorMessage = '';

  constructor(
    private repoHttpAdapter: RepoHttpAdapter,
    private globalLoadingService: GlobalLoadingService,
  ) { }

  ngOnInit(): void {
    this.loadRepos();
  }

  async loadRepos(): Promise<void> {
    try {
      const queryParams: QueryParams = { sort: 'pushed' };
      const response = await this.repoHttpAdapter.getAllRepos(queryParams);
      this.repos = response;
    } catch (error: any) {
      console.error('Error loading repositories:', error);
      this.errorMessage = error?.message || '';
    }
  }
}
