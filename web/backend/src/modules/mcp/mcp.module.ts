import { Module } from '@nestjs/common';
import { McpModule } from '@rekog/mcp-nest';
import { ServiceModule } from '../services/service.module';
import { ListServiceTool } from '../services/app/tools/list-service.tool';
// import { McpAuthGuard } from './guards/mcp-auth.guard';
// import { UserTool } from './tools/user.tool';

@Module({
  imports: [
    McpModule.forRoot({
      name: 'Qcena MCP',
      version: '1.0.0',
    }),
    ServiceModule,
  ],
  providers: [ListServiceTool], // ← regista aqui
})
export class McpModules {}
