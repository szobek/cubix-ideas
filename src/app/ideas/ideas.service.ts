import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Idea } from './models/idea.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IdeasService {
  private readonly BASE_URL = `${environment.baseUrl}/ideas`;
  loader: WritableSignal<boolean> = signal(true);
  ideaList: WritableSignal<Idea[]> = signal([]);
  idea: WritableSignal<Idea> = signal({} as Idea);
  ideasService: Idea | undefined;
  private readonly http: HttpClient = inject(HttpClient);

  listIdeas() {
    return this.http.get<Idea[]>(`${this.BASE_URL}`);
  }

  upvoteIdea(idea: Idea) {
    return this.http.patch<{ id: string }>(
      `${this.BASE_URL}/${idea.id}/upvote`,
      null
    );
  }

  downvoteIdea(idea: Idea) {
    return this.http.patch<{ id: string }>(
      `${this.BASE_URL}/${idea.id}/downvote`,
      null
    );
  }

  deleteIdea(idea: Idea) {
    return this.http.delete<{ id: string }>(`${this.BASE_URL}/${idea.id}`);
  }
  createIdea(idea: Idea) {
    return this.http.post<Idea>(`${this.BASE_URL}`, idea);
  }

  getIdeaById(id: string) {
    return this.http.get<Idea>(`${this.BASE_URL}/${id}`);
  }

  editIdea(id: string, idea: Idea) {
    return this.http.put<Idea>(`${this.BASE_URL}/${id}`, idea);
  }
}
